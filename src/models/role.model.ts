import mongoose, {Schema} from "mongoose";
import { IBase } from "../interfaces/interfaces";


const roleSchema = new Schema<IBase>(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description field is required"],
        }
    }
)

export const Role = mongoose.model<IBase>("Role", roleSchema);