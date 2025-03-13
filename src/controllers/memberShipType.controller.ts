import { MemberShip } from "../models/memberShip.model";
import { MemberShipCategory } from "../models/memberShipCategory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";




const addMembershipCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, "name or description is required");
    }
    const existingMembershipCategory = await MemberShipCategory.findOne({ name });

    if (existingMembershipCategory) {
        throw new ApiError(409, "Membership category already exists");
    }

    const memberShipCategory = await MemberShipCategory.create(
        {
            name, description
        }
    )
    const createdCategory = await MemberShipCategory.findById(memberShipCategory?._id.toString());
    if (!createdCategory) {
        throw new ApiError(500, "Failed to create membership category");
    }

    return res.status(200).json(
        new ApiResponse(200, "Category created successfully")
    )
})

const addMemberShip = asyncHandler(async (req: Request, res: Response) => {
    const { name, categoryName, period, amount, description } = req.body;
    if ([name, categoryName, period, amount, description].some(field => field == "")) {
        throw new ApiError(400, "name, category, period, amount or description is required");
    }

    const existingMemberShip = await MemberShip.findOne({ name });
    if (existingMemberShip) {
        throw new ApiError(400, "Membership name already exists");
    }

    // console.log("categoryName", categoryName);
    const category = await MemberShipCategory.findOne({ name: categoryName });
    // console.log("category", category);
    if (!category) {
        throw new ApiError(400, "Category not found");
    }

    const memberShip = await MemberShip.create(
        {
            name,
            category: category._id,
            period, amount, description
        }
    )

    const createdMemberShip = await MemberShip.findById(memberShip?._id)

    if (!createdMemberShip) {
        throw new ApiError(500, "Failed to create membership");
    }

    return res.status(200).json(
        new ApiResponse(200, "Membership created successfully", createdMemberShip)
    )
})

const getMemberShipAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const memberShipCategories = await MemberShipCategory.find({});
    if (!memberShipCategories || memberShipCategories.length === 0) {
        throw new ApiError(404, "No membership categories found");
    }
    return res.status(200).json(
        new ApiResponse(200, "Membership categories fetched successfully", memberShipCategories)
    );
});

const getMemberShipCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Membership category id is required");
    }
    const memberShipCategory = await MemberShipCategory.findById(id);
    if (!memberShipCategory) {
        throw new ApiError(404, "Membership category not found");
    }
    return res.status(200).json(
        new ApiResponse(200, "Membership category fetched successfully", memberShipCategory)
    );
});

const getMemberShipDetailById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const memberShip = await MemberShip.findById(id).populate("category");
    if (!memberShip) {
        throw new ApiError(404, "Membership not found");
    }
    return res.status(200).json(
        new ApiResponse(200, "Membership fetched successfully", memberShip)
    );
});

const getMemberShipList = asyncHandler(async (req: Request, res: Response) => {
    const memberShipList = await MemberShip.find().populate("category");

    if (!memberShipList || memberShipList.length === 0) {
        throw new ApiError(404, "No memberships found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Memberships fetched successfully", memberShipList)
    )
})

const updateMemberShipCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
        throw new ApiError(400, "Membership category id is required");
    }

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const duplicateMemberShipCategory = await MemberShipCategory.findOne(
        {
            name,
            _id: { $ne: id }
        }
    )

    if (duplicateMemberShipCategory) {
        throw new ApiError(400, "A membership category with the same name already exists");
    }

    const updatedMemberShipCategory = await MemberShipCategory.findByIdAndUpdate(
        id,
        {
            name,
            description
        },
        { new: true }
    )

    if (!updatedMemberShipCategory) {
        throw new ApiError(500, "Failed to update membership category");
    }

    return res.status(200).json(
        new ApiResponse(200, "Membership category updated successfully", updatedMemberShipCategory)
    )
})

const updateMemberShip = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, categoryName, period, amount, description } = req.body;

    if (!id) {
        throw new ApiError(400, "Membership id is required");
    }

    if ([name, categoryName, period, amount, description].some(field => field === "")) {
        throw new ApiError(400, "name, category, period, amount or description is required");
    }

    const duplicateMemberShip = await MemberShip.findOne(
        {
            name,
            _id: { $ne: id }
        }
    )

    if (duplicateMemberShip) {
        throw new ApiError(400, "A memberShip with the same name already exist!")
    }

    const category = await MemberShipCategory.findOne({ name: categoryName });
    if (!category) {
        throw new ApiError(400, "Category not found");
    }
    const updatedMembership = await MemberShip.findByIdAndUpdate(
        id,
        {
            name,
            category: category._id,
            period, amount, description
        },
        { new: true }
    )

    if (!updatedMembership) {
        throw new ApiError(500, "Failed to update membership");
    }

    return res.status(200).json(
        new ApiResponse(200, "Membership updated successfully", updatedMembership)
    )
})

const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Membership category id is required");
    }
    const deletedMembershipCategory = await MemberShipCategory.findByIdAndDelete(id);
    if (!deletedMembershipCategory) {
        throw new ApiError(500, "Failed to delete membership category");
    }
    return res.status(200).json(
        new ApiResponse(200, "Membership category deleted successfully")
    )
});

const deleteMemberShip = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    console.log("id memberhsip", id)
    if (!id) {
        throw new ApiError(400, "Membership id is required");
    }
    const deletedMembership = await MemberShip.findByIdAndDelete(id);
    if (!deletedMembership) {
        throw new ApiError(500, "Failed to delete membership");
    }
    return res.status(200).json(
        new ApiResponse(200, "Membership deleted successfully")
    )
});

export { addMembershipCategory, addMemberShip, getMemberShipAllCategories, getMemberShipList, updateMemberShipCategory, updateMemberShip, getMemberShipCategoryById, deleteCategoryById, deleteMemberShip, getMemberShipDetailById }