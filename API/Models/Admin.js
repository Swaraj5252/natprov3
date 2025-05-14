const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        adminEmail: {   
            type: String,
            required: true,
            unique: true
        },
        adminPassword: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("NatproAdmins", adminSchema)