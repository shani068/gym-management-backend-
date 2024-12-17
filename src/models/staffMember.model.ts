import mongoose, { Schema } from "mongoose";
import { IStaffMember } from "../interfaces/interfaces";


const staffMemberSchema = new Schema<IStaffMember>(
    {
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true
        },
        gender: {
            type: String,
            required: [true, "Gender is required"],
            trim: true
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Date of Birth is required"],
            trim: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: [true, "Role is required"],
        },
        specialization: {
            type: Schema.Types.ObjectId,
            ref: "Specialization",
            required: [true, "Specialization is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (value: string)=>{
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                },
                message: (props)=>{
                    return props.value + " is not a valid email";
                }
            }
        },
    },
    { timestamps: true }
)

export const StaffMember = mongoose.model<IStaffMember>("StaffMember", staffMemberSchema);