import mongoose, { Schema } from "mongoose";
import { IMemberShipCategory } from "../interfaces/interfaces";



const memberShipCategorySchema = new Schema<IMemberShipCategory>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true,
        }, 
        description: {
            type: String,
            required: [true, "Description is required"],
        }
    },
    {
        timestamps: true
    }
)


export const MemberShipCategory = mongoose.model<IMemberShipCategory>("MemberShipCategory", memberShipCategorySchema);