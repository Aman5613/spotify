import mongoose from "mongoose";
import config from "../config/config.js";

async function connectDB(){
    try { 
        await mongoose.connect(config.MONGO_URI).then(() => {
            console.log("MongoDB connected successfully");
        });     
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message || error);
    }
}

export default connectDB;