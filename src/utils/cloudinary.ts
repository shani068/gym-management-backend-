import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"


dotenv.config();


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath: string) =>{
    try {
       
        if(!localFilePath) return null;

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // console.log("Upload Successfully file on Cloudinary", uploadResult);
        fs.unlinkSync(localFilePath);
        return uploadResult
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading file on Cloudinary", error);
        return null;
    }
}


export { uploadOnCloudinary }