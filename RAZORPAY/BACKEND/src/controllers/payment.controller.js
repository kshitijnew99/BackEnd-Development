const productModel = require("../models/product.model");
const Razorpay = require("razorpay");
const Payment = require("../models/payment.model");

async function createOrder(req, res) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({
        message: "Razorpay keys missing in environment",
        required: ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"],
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    let product = await productModel.findOne();

    if (!product) {
      product = {
        price: { amount: 5999, currency: "INR" },
        title: "chair",
      };
    }

    const currency = product?.price?.currency || "INR";

    const amountRupees = Number(product?.price?.amount);

    if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
      return res.status(400).json({
        message: "Invalid product price",
      });
    }

    const amountSmallestUnit =
      currency === "INR"
        ? Math.round(amountRupees * 100)
        : Math.round(amountRupees);

    const options = {
      amount: amountSmallestUnit,
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      orderId: order.id,
      price: {
        amount: order.amount,
        currency: order.currency,
      },
      status: "PENDING",
    });

    return res.status(201).json({ order, keyId });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating order",
      error: error?.message,
    });
  }
}

async function verifyPayment(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");

    const result = validatePaymentVerification(
      { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
      signature,
      secret
    );
    if (result) {
      const payment = await Payment.findOne({ orderId: razorpayOrderId });
      if (!payment) {
        return res.status(404).json({
          message: "Payment record not found for order",
        });
      }
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = "COMPLETED";
      await payment.save();
      res.json({ status: "success" });
    } else {
      res.status(400).send("Invalid signature");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying payment");
  }
}

module.exports = { createOrder , verifyPayment };
