const mongoose = require('mongoose');
const Product = require('./models/Products');

const products = [
    { name: "Cà phê đen", price: 20000 },
    { name: "Cà phê sữa", price: 25000 },
    { name: "Bạc xỉu", price: 28000 },
    { name: "Cà phê đá xay", price: 40000 },

    { name: "Trà đào", price: 30000 },
    { name: "Trà chanh", price: 22000 },
    { name: "Trà vải", price: 32000 },
    { name: "Trà tắc", price: 18000 },

    { name: "Trà sữa truyền thống", price: 35000 },
    { name: "Trà sữa matcha", price: 38000 },
    { name: "Trà sữa socola", price: 39000 },
    { name: "Trà sữa dâu", price: 37000 },

    { name: "Nước suối", price: 10000 },
    { name: "Pepsi", price: 15000 },
    { name: "Coca Cola", price: 15000 },
    { name: "7Up", price: 15000 },

    { name: "Sinh tố dâu", price: 45000 },
    { name: "Sinh tố xoài", price: 45000 },
    { name: "Sinh tố bơ", price: 50000 },
    { name: "Sinh tố chuối", price: 40000 }
];

const run = async () => {
    try {
        const mongoURI =
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/POS';

        await mongoose.connect(mongoURI);

        console.log("Đã kết nối MongoDB");

        await mongoose.connection.createCollection('orders').catch(() => { });

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Đã tạo products và orders");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {
        console.error("Seed lỗi:", error.message);
        process.exit(1);
    }
};

run();