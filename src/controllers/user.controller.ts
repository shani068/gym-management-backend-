import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model"
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";


const options = {
    httpOnly: true,
    secure: true,
}


const generateAccessAndRefreshToken = async (userId:string) => {
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(404, "User not found!")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, phone, address, password } = req.body;

    if ([username, email, phone, address, password].some(field => field.trim == "")) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const existingUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existingUser) {
        throw new ApiError(400, "User with this email or username already exists");
    }

    const user = await User.create(
        {
            username, email, phone, address, password
        }
    )
    const createdUser = await User.findById(user?._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }
    return res.status(200).json(
        new ApiResponse(200, "User created successfully", createdUser)
    )
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    if(!(username || email)){
        throw new ApiError(400, "Please provide username or email")
    }

    const user = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if(!user){
        throw new ApiError(400, "User not found")
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
        throw new ApiError(400, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id.toString());
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken).json(
        new ApiResponse(
            200,
            "User logged in successfully",
            {
                user: loggedInUser, accessToken, refreshToken
            }
        )
    )
})

const logoutUser = asyncHandler(async (req: Request, res: Response)=>{
   
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200).cookie("accessToken", options).cookie("refreshToken", options).json(
        new ApiResponse(
            200,
            "User logged out successfully",
            {}
        )
    )
})
export { registerUser, loginUser, logoutUser }