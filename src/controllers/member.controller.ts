import { Group } from "../models/group.model";
import { Member } from "../models/member.model";
import { MemberShip } from "../models/memberShip.model";
import { StaffMember } from "../models/staffMember.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Request, Response } from "express";




const addMember = asyncHandler(async (req: Request, res: Response) =>{
    const {  image, firstName, lastName, gender, dateOfBirth, groupName, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat, staffMemberName, memberShipName, memberShipValidFrom, memberShipValidTo } = req.body;

    if([image, firstName, lastName, gender, dateOfBirth, groupName, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat, staffMemberName, memberShipName, memberShipValidFrom, memberShipValidTo].some(field => field?.trim() == "")){
        throw new ApiError(400, "All fields are required");
    }

    const existingMember = await Member.findOne({ email });
    if(existingMember){
        throw new ApiError(400, `Member with email ${email} already exists`);
    }

    const group = await Group.findOne({ name: groupName });
    if(!group){
        throw new ApiError(404, "Group not found");
    }

    const staffMember = await StaffMember.findOne(
        {
            $expr: {
                $eq: [
                    {
                        $concat: ["$firstName", " ", "$lastName"]
                    },
                    staffMemberName,
                ]
            }
        }
    );
    if(!staffMember){
        throw new ApiError(404, "Staff member not found");
    }

    const memberShip = await MemberShip.findOne({ name: memberShipName });
    if(!memberShip){
        throw new ApiError(404, "Member ship not found");
    }

    const memberImage = req.file ? await uploadOnCloudinary(req.file?.path) : null;
    if(!memberImage){
        throw new ApiError(400, "Member image is required");
    }

    const member = await Member.create(
        {
            firstName, lastName, gender, dateOfBirth, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat, 
            staffMember: staffMember?._id, 
            memberShip: memberShip._id, 
            image: memberImage?.url,
            group: group._id,
            memberShipValidFrom,
            memberShipValidTo
        }
    )
    if(!member){
        throw new ApiError(500, "Failed to create member");
    }

    return res.status(201).json(
        new ApiResponse(200, "Member created successfully", member)
    )
})

const updateMember = asyncHandler(async (req: Request, res: Response) =>{
    const { id } = req.params;
    const {  image, firstName, lastName, gender, dateOfBirth, groupName, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat, staffMemberName, memberShipName, memberShipValidFrom, memberShipValidTo } = req.body;

    if(!id){
        throw new ApiError(400, "id is required");
    }

    if([image, firstName, lastName, gender, dateOfBirth, groupName, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat, staffMemberName, memberShipName, memberShipValidFrom, memberShipValidTo].some(field => field?.trim() == "")){
        throw new ApiError(400, "All fields are required");
    }

    const existingMember = await Member.findOne(
        {
            email,
            _id: { $ne: id }
        }
    )
    if(existingMember){
        throw new ApiError(400, "Member already exists");
    }

    const group = await Group.findOne({ name: groupName });
    if(!group){
        throw new ApiError(404, "Group not found");
    }

    const staffMember = await StaffMember.findOne(
        {
            $expr: {
                $eq: [
                    { $concat: ["$firstName", " ", "$lastName"] },
                    staffMemberName,
                ]
            }
        }
    )
    if(!staffMember){
        throw new ApiError(404, "Staff member not found");
    }

    const memberShip = await MemberShip.findOne({ name: memberShipName });
    if(!memberShip){
        throw new ApiError(404, "Member ship not found");
    }

    const memberImage = req.file ? await uploadOnCloudinary(req.file?.path) : null;
    if(!memberImage){
        throw new ApiError(400, "Member image is required");
    }

    const updatedMember = await Member.findByIdAndUpdate(
        id,
        {
            firstName, lastName, gender, dateOfBirth, address, city, state, phone, email, weight, height, chest, waist, thigh, arms, fat,
            staffMember: staffMember?._id,
            memberShip: memberShip._id,
            image: memberImage?.url,
            group: group._id,
            memberShipValidFrom,
            memberShipValidTo
        },
        { new: true }
    )
    if(!updatedMember){
        throw new ApiError(500, "Failed to update member");
    }

    return res.status(200).json(
        new ApiResponse(200, "Member updated successfully", updatedMember)
    )
})

const deleteMember = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;

    if(!id){
        throw new ApiError(400, "Member id is required");
    }

    const memberId = await Member.findById(id);
    if(!memberId){
        throw new ApiError(404, "Member not found");
    }

    const deletedMember = await Member.findByIdAndDelete(id);
    if(!deletedMember){
        throw new ApiError(500, "Failed to delete member");
    }

    return res.status(200).json(
        new ApiResponse(200, "Member deleted successfully", deletedMember)
    )
})

export { addMember, updateMember, deleteMember }