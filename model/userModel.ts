import { Schema, Types, model } from "mongoose";
import { iUserData } from "../utils/interface";


const userModel = new Schema<iUserData>({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
    },
    store: [{
        type: Types.ObjectId,
        ref:"stores"
    }]
}, {
    timestamps:true
})

export default model<iUserData>("users",userModel)