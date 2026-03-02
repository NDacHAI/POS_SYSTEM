const express = require("express");
const router = express.Router();

const Order = require("../models/Orders");

router.post("/", async (req, res) => {

    try {

        const { items, total } = req.body;

        const newOrder = await Order.create({
            _id: Date.now(),
            items,
            total
        });

        req.io.emit("newOrder", newOrder);

        res.json({
            message: "Thanh toán thành công",
            order: newOrder
        });

    } catch (error) {

        res.status(500).json({
            message: "Thanh toán không thành công",
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const orders = await Order.find().sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;