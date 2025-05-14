const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    }
}, {timestamps: true})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    careLevel: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean,
        required: true
    },
    reviews: [commentSchema]
},
{timestamps: true})

module.exports = mongoose.model("Plants", productSchema)