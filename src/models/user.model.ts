import mongoose, {Schema, Model} from "mongoose";
import { IUser } from "../interfaces/interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

interface IUserMethods{
    comparePassword(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

type UserModel = Model<IUser , {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (value: string)=>{
                    return /^[a-zA-Z0-9]+$/.test(value);
                },
                message: (props)=>{
                    return props.value + " is not a valid username";
                }
            }
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (value: string)=>{
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                },
                message: (props)=>{
                    return props.value + " is not a valid email";
                }
            }
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            unique: true,
            trim: true,
            validate: {
                validator: (value: string)=>{
                    return /^[0-9]{11}$/.test(value);
                },
                message: (props)=>{
                    return props.value + " is not a valid phone number";
                }
            }
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            maxlength: [12, "Password must be at most 12 characters"],
            trim: true,
            validate: {
                validator: (value: string)=>{
                    return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/.test(value);
                },
                message: (props)=>{
                    return `${props.value} is not a valid password`;
                }
            }
        },
        refreshToken: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new ApiError(404,"ACCESS_TOKEN_SECRET is not set");
    }
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    if(!process.env.REFRESH_TOKEN_SECRET){
        throw new ApiError(404,"REFRESH_TOKEN_SECRET is not set");
    }
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model<IUser, UserModel>("User", userSchema);