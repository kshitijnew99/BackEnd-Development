import React, { useState } from "react";
import axios from "axios";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function PaymentButton() {
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async () => {
    if (isPaying) return;

    setIsPaying(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        alert("Failed to load Razorpay Checkout");
        return;
      }

      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!key) {
        alert("Missing VITE_RAZORPAY_KEY_ID in frontend env");
        return;
      }

      // Step 1: Create order on backend
      const { data } = await axios.post("http://localhost:3000/payments/create-order", {});
      const order = data?.order || data;
      const checkoutKey = data?.keyId || key;

      // Step 2: Razorpay options
      const options = {
        key: checkoutKey,
        amount: order.amount,
        currency: order.currency,
        name: "My Company",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          try {
            await axios.post("http://localhost:3000/payments/verify", {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              signature: razorpay_signature,
            });
            alert("Payment successful!");
          } catch (err) {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#51a2caff"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err?.response?.data?.error || err.message || "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <button className="button" onClick={handlePayment} disabled={isPaying}>
      {isPaying ? "Opening…" : "Pay Now"}
    </button>
  );
}

export default PaymentButton; 