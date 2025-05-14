const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
      },
    user: {
      type: String,
      required: true 
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Plants',
        },
      },
    ],
    shippingAddress: {
      type: String,
      required : true
    },
    email: {
      type: String,
      required : true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true,
      // default: 0,
    },
    totalQuantity: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: "pending"
    },
}, {timestamps: true})

module.exports = mongoose.model("Orders", orderSchema)