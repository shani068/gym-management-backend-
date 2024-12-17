import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
import { app } from "./app.js";


dotenv.config();


connectDB().then(() =>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
        
    })

    app.on("error", (error)=>{
        console.log("Express Server Error !!!", error);
    })
}).catch((error)=>{
    console.log("MONGODB Connection Failed !!!", error);
})
