// controllers/addressController.js
const addressModel = require("../model/Address");
const crypto = require("crypto");
const razorpay = require("../utils/Razorpay");
const orderModel = require("../model/order");
const Email = require("../utils/Email");


//  SAVE ADDRESS
const saveAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}

    const { name, address, city, pincode, phone } = req.body;

    const newAddress = await addressModel.create({
      userId,
      name,
      address,
      city,
      pincode,
      phone,
    });

    res.json({ success: true, data: newAddress });
  } catch (error) {
    res.status(500).json(error);
  }
};

//  GET USER ADDRESS
const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await addressModel.findOne({ userId });

    res.json({ success: true, data: address });
  } catch (error) {
    res.status(500).json(error);
  }
};


//  1. CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount required" });
    }

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

const paymentVerify = async (req, res) => {
  try {
    const user = req.user;

    const {
      vehicleId,
      price,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;


    //  VALIDATION
    if (
      !vehicleId ||
      !price ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  SIGNATURE VERIFY
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    //  SAVE ORDER
    const order = await orderModel.create({
      vehicleId,
      userId: user?.userId,
      price,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
    });

    //  SEND EMAIL
    if (user?.email) {
      await Email(
        user.email,
        "Booking Confirmed 🚗",
        `
        <h2>Payment Successful 🎉</h2>
        <p>Your booking is confirmed.</p>

        <ul>
          <li>Vehicle ID: ${vehicleId}</li>
          <li>Amount: ₹${price}</li>
          <li>Payment ID: ${razorpay_payment_id}</li>
          <li>Order ID: ${razorpay_order_id}</li>
        </ul>
        `
      );
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: order,
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    saveAddress,
    getAddress,
    createOrder,
    paymentVerify
}