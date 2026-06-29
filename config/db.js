const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Keeps your code clean and automatically defaults to your environment variable
    const conn = await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Force-stops the server if the database fails to connect
  }
};

module.exports = connectDB;
