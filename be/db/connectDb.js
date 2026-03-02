const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI =
            process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/POS';

        await mongoose.connect(mongoURI);

        console.log('Kết nối MongoDB thành công');
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;