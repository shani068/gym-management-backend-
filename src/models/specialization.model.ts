import mongoose, { Schema } from "mongoose";
import { IBase } from "../interfaces/interfaces";



const specializationSchema = new Schema<IBase>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        }
    }
)


export const Specialization = mongoose.model<IBase>("Specialization", specializationSchema);