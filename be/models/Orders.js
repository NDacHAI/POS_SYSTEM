const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        items: [
            {
                productId: Number,
                name: String,
                price: Number
            }
        ],
        total: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

// đổi _id thành id khi trả JSON
orderSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model("Order", orderSchema, "orders");