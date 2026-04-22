const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.SPRING_DATA_MONGODB_URI);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;