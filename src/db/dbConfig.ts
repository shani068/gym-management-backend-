import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,{w:"majority",retryWrites:true, authMechanism:"DEFAULT"});
        console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error !!", error);
        process.exit(1);
    }
}

export default connectDB;