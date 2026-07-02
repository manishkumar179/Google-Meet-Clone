const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/firebase");
    console.log("Database connected");
  } catch (error) {
    console.log("Error in database connection", error);
  }
};

module.exports = connectDb



