import mongoose, { Schema } from "mongoose";
import { IBase } from "../interfaces/interfaces";


const groupSchema = new Schema<IBase>(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description field is required"],
        },
    }
)


export const Group = mongoose.model<IBase>("Group", groupSchema);