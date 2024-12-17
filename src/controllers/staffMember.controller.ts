import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { StaffMember } from "../models/staffMember.model";
import { Role } from "../models/role.model";
import { Specialization } from "../models/specialization.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";




const addStaffMember = asyncHandler(async (req: Request, res: Response)=>{
    const {  firstName, lastName, gender, dateOfBirth, roleName, specializationName, address, city, state, phone, email } = req.body;

    if([firstName, lastName, gender, dateOfBirth, roleName, specializationName, address, city, state, phone, email].some(field => field?.trim() == "")){
        throw new ApiError(400, "All fields are required");
    }

    const existingStaffMember = await StaffMember.findOne({ email });
    if(existingStaffMember){
        throw new ApiError(400, "Staff member already exists");
    }

    const role = await Role.findOne({ name: roleName });
    if(!role){
        throw new ApiError(400, "Role not found");
    }

    const specialization = await Specialization.findOne({ name: specializationName });
    if(!specialization){
        throw new ApiError(400, "Specialization not found");
    }

    const staffImage = req.file ? await uploadOnCloudinary(req.file?.path) : null;
    // console.log("staf image" , staffImage);
    if(!staffImage){
        throw new ApiError(400, "Staff image is required");
    }

    const staffMember = await StaffMember.create(
        {
            firstName, lastName, gender, dateOfBirth, address, city, state, phone, email,
            role: role._id,
            specialization: specialization._id,
            image: staffImage?.url
        }
    )

    const createdStaffMember = await StaffMember.findById(staffMember?._id)
    
    if(!createdStaffMember){
        throw new ApiError(500, "Failed to create staff member");
    }

    return res.status(201).json(
        new ApiResponse(200, "Staff member created successfully", createdStaffMember)
    )
})


export { addStaffMember }