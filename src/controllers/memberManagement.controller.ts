import { Role } from "../models/role.model";
import { Specialization } from "../models/specialization.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";




const addRole = asyncHandler(async (req: Request, res: Response)=>{
    const { name, description } = req.body;

    if(!name || !description){
        throw new ApiError(400, "Name and description are required");
    }

    const existingRole = await Role.findOne({ name });
    if(existingRole){
        throw new ApiError(400, "Role already exists");
    }

    const role = await Role.create({ name, description });

    const createdRole = await Role.findById(role._id)
    if(!createdRole){
        throw new ApiError(500, "Failed to create role");
    }

    return res.status(201).json(
        new ApiResponse(200, "Role created successfully", createdRole)
    )
})

const add_specialization = asyncHandler(async (req: Request, res: Response)=>{
    const { name, description } = req.body;

    if(!name || !description){
        throw new ApiError(400, "Name and description are required");
    }

    const existingSpecialization = await Specialization.findOne({ name })
    
    if(existingSpecialization){
        throw new ApiError(400, "Specialization already exists");
    }

    const specialization = await Specialization.create({ name, description })

    const createdSpecialization = await Specialization.findById(specialization._id)

    if(!createdSpecialization){
        throw new ApiError(500, "Failed to create specialization");
    }

    return res.status(201).json(
        new ApiResponse(200, "Specialization created successfully", createdSpecialization)
    )
})

const getRoleList = asyncHandler(async (req: Request, res: Response)=>{

    const roleList = await Role.find()

    if(!roleList || roleList.length === 0){
        throw new ApiError(404, "No roles found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Roles fetched successfully", roleList)
    )
})

const getSpecializationList = asyncHandler(async (req: Request, res: Response)=>{
    const specialization_list = await Specialization.find();

    if(!specialization_list || specialization_list.length === 0){
        throw new ApiError(404, "Specialization List not Found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Specialization list fetched successfully", specialization_list)
    )
})

const updateRole = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;
    const { name, description } = req.body;

    if(!id){
        throw new ApiError(400, "Role id is required");
    }
    if(!name || !description){
        throw new ApiError(400, "Name and description are required");
    }

    const duplicateRole  = await Role.findOne(
        {
            name,
            _id: { $ne: id }
        }
    )
    if(duplicateRole){
        throw new ApiError(400, "A role with the same name already exists");
    }

    const updatedRole = await Role.findByIdAndUpdate(
        id,
        {
            name, description
        },
        { new: true }
    )

    if(!updatedRole){
        throw new ApiError(500, "Failed to update role");
    }

    return res.status(200).json(
        new ApiResponse(200, "Role updated successfully", updatedRole)
    )
})

const deleteRole = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;
    if(!id){
        throw new ApiError(400, "Role id is required");
    }

    const role = await Role.findById(id)
    if(!role){
        throw new ApiError(404, "Role not found");
    }

    const deleteRole = await Role.findByIdAndDelete(id)
    if(!deleteRole){
        throw new ApiError(500, "Failed to delete role");
    }

    return res.status(200).json(
        new ApiResponse(200, "Role deleted successfully", deleteRole)
    )
})

const updateSpecialization = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;
    const { name, description } = req.body;

    if(!id){
        throw new ApiError(400, "Specialization id is required");
    }

    if(!name || !description){
        throw new ApiError(400, "Name and description are required");
    }

    const duplicateSpecialization = await Specialization.findOne(
        {
            name,
            _id: { $ne: id }
        }
    )
    if(duplicateSpecialization){
        throw new ApiError(400, "A specialization with the same name already exists");
    }

    const updatedSpecialization = await Specialization.findByIdAndUpdate(
        id,
        {
            name, description
        },
        { new: true }
    )

    if(!updatedSpecialization){
        throw new ApiError(500, "Failed to update specialization");
    }

    return res.status(200).json(
        new ApiResponse(200, "Specialization updated successfully", updatedSpecialization)
    )
})

const deleteSpecialization = asyncHandler(async (req: Request, res: Response)=>{
    const { id } = req.params;
    if(!id){
        throw new ApiError(400, "Specialization id is required");
    }

    const specialization = await Specialization.findById(id)
    if(!specialization){
        throw new ApiError(404, "Specialization not found");
    }

    const deleteSpecialization = await Specialization.findByIdAndDelete(id)
    if(!deleteSpecialization){
        throw new ApiError(500, "Failed to delete specialization");
    }

    return res.status(200).json(
        new ApiResponse(200, "Specialization deleted successfully", deleteSpecialization)
    )
})

export { addRole, getRoleList, add_specialization, getSpecializationList, updateSpecialization, updateRole, deleteRole, deleteSpecialization };