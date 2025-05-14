const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    plant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Plants"
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    quantity: {
        type:String,
        required: true,
    },
    price: {
        type: String,
        // required: true
    },
    stock: {
        type: String,
    }
}, {timestamps: true})

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cart: [cartSchema]
    },
    {timestamps: true}
)

module.exports = mongoose.model("Users", userSchema)