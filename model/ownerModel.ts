import { iOwnerData } from './../utils/interface';
import { Schema, Types, model } from 'mongoose';


const ownerModel = new Schema<iOwnerData>({
    userName: {
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required:true
    },
    verified: {
        type: Boolean,
        default:false
    },
    token: {
        type: String,
    },
    role: {
        type: String,
    },
    store: {
        type:[]
    }
}, {
    timestamps: true,
})

export default model<iOwnerData>("owners",ownerModel)