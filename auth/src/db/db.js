import mongoose, { mongo } from "mongoose";
import config from "../config/config.js";

async function connectDB() {

    try {

        await mongoose.connect(config.MONGO_URI).then(() => {
            console.log("Connected to MongoDB");
        })
        
    } catch (error) {
        console.error("Database connection error:", error);
    }
    
}

export default connectDB