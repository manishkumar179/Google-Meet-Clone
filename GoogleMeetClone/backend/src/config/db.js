const mongoose = require("mongoose")

let connectDB =async ()=>{
    try {
        await mongoose.connect("mongodb://0.0.0.0/GoogleMeet")
        console.log("Databse connected successfully")
    } catch (error) {
        console.log("Error in database connection")
    }
}

module.exports = connectDB