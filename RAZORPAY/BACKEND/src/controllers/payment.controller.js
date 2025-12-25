const productModel = require('../models/product.model');
const Razorpay = require('razorpay');
const Payment = require('../models/payment.model');

async function createOrder(req, res) {
    try {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        // if (!keyId || !keySecret) {
        //     return res.status(500).json({
        //         message: 'Razorpay keys missing in environment',
        //         required: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'],
        //     });
        // }

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        const product = await productModel.findOne();

        // if (!product) {
        //     return res.status(400).json({
        //         message: 'No product found to create an order',
        //     });
        // }

        const currency = product?.price?.currency || 'INR';

        const amountRupees = Number(product?.price?.amount);

        // if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
        //     return res.status(400).json({
        //         message: 'Invalid product price',
        //     });
        // }

        const amountSmallestUnit = currency === 'INR' ? Math.round(amountRupees * 100) : Math.round(amountRupees);

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
            status: 'PENDING',
        });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating order',
            error: error?.message,
        });
    }
}

module.exports = { createOrder };