import mongoose, { Schema } from "mongoose";
import { IMemberShip } from "../interfaces/interfaces";


const memberShipSchema = new Schema<IMemberShip>(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            trim: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "MemberShipCategory",
            required: [true, "Category field is required."]
        },
        period: {
            type: String,
            required: [true, "Period field is required."],
        },
        amount: {
            type: Number,
            required: [true, "Amount field is required."],
        },
        description: {
            type: String,
            required: [true, "Description field is required."],
        }
    },
    {
        timestamps: true
    }
)

export const MemberShip = mongoose.model<IMemberShip>("MemberShip", memberShipSchema);