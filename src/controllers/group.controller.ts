import { Group } from "../models/group.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";



const addGroup = asyncHandler(async (req: Request, res: Response)=>{
    const { name, description } = req.body;

    if(!name || !description){
        throw new ApiError(400, "name or description fields required.")
    }

    const existingGroup = await Group.findOne({ name });

    if(existingGroup){
        throw new ApiError(400, "Group already exist");
    }

    const group = await Group.create(
        {
            name,
            description
        }
    )

    const createdGroup = await Group.findById(group?._id)

    if(!createdGroup){
        throw new ApiError(500, "Failed to create group");
    }

    return res.status(200).json(
        new ApiResponse(200, "Group created successfully", createdGroup)
    )
})


const getGroupList = asyncHandler(async (req: Request, res: Response)=>{

    const groupList = await Group.find();

    if(!groupList || groupList.length === 0){
        throw new ApiError(404, "No groups found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Groups fetched successfully", groupList)
    )
})

const updateGroup = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;
    const { name, description } = req.body;

    if(!id){
        throw new ApiError(400, "Group id is required");
    }

    if(!name || !description){
        throw new ApiError(400, "name or description fields required.");
    }

    const duplicateGroup = await Group.findOne(
        {
            name,
            _id: { $ne: id }
        }
    )
    if(duplicateGroup){
        throw new ApiError(400, "Group with this name already exist");
    }

    const updateGroup = await Group.findByIdAndUpdate(
        id, 
        {
            name, description
        },
        { new : true }
    )
    if(!updateGroup){
        throw new ApiError(500, "Failed to update Group!")
    }

    return res.status(200).json(
        new ApiResponse(200, "Group Updated Successfully!", updateGroup)
    )
})

const deleteGroup = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;

    if(!id){
        throw new ApiError(400, "Group id is required");
    }

    const group = await Group.findById(id)
    if(!group){
        throw new ApiError(404, "Group not found");
    }

    const deleteGroup = await Group.findByIdAndDelete(id)

    if(!deleteGroup){
        throw new ApiError(500, "Failed to delete group");
    }

    return res.status(200).json(
        new ApiResponse(200, "Group deleted successfully", deleteGroup)
    )
})

export { addGroup, getGroupList, updateGroup, deleteGroup }