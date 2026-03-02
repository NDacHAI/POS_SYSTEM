const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require('dotenv').config();

const connectDB = require("./db/connectDb");

const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

// tạo socket server
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// cho phép dùng io trong routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// socket connection
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// start server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});