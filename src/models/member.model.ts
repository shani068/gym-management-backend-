import mongoose, { Schema } from "mongoose";
import { IMember } from "../interfaces/interfaces";



const memberSchema = new Schema<IMember>(
    {
        image: {
            type: String,
            required: true
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
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: [true, "Group is required"],
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
        weight: {
            type: Number,
            required: [true, "Weight is required"],
            trim: true
        },
        height: {
            type: Number,
            required: [true, "Height feild is required"],
            trim: true
        },
        chest: {
            type: Number,
            required: [true, "Chest feild is required"],
            trim: true
        },
        waist: {
            type: Number,
            required: [true, "Waist feild is required"],
            trim: true
        },
        thigh: {
            type: Number,
            required: [true, "Thigh feild is required"],
            trim: true
        },
        arms: {
            type: Number,
            required: [true, "Arms feild is required"],
            trim: true
        },
        fat: {
            type: Number,
            required: [true, "Fat feild is required"],
            trim: true
        },
        staffMember: {
            type: Schema.Types.ObjectId,
            ref: "StaffMember",
            required: [true, "Staff Member is required"],
        },
        memberShip: {
            type: Schema.Types.ObjectId,
            ref: "MemberShip",
            required: [true, "MemberShip is required"],
        },
        memberShipValidFrom: {
            type: Date,
            required: [true, "MemberShip Valid From is required"],
            trim: true
        },
        memberShipValidTo: {
            type: Date,
            required: [true, "MemberShip Valid To is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
)

export const Member = mongoose.model<IMember>("Member", memberSchema);