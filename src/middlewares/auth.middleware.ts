import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface decodedToken extends JwtPayload{
    _id: string;
}

export const verifyJwt = asyncHandler(async (req: Request, _: Response, next: NextFunction) =>{
    const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "")

    try {
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        if(!process.env.ACCESS_TOKEN_SECRET){
            throw new ApiError(500, "Access token secret is not set")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as decodedToken;
        console.log("docodedToken ", decodedToken)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error:any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})