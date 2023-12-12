import { iOwnerData } from './../utils/interface';
import { Schema, Types, model } from 'mongoose';


const ownerModel = new Schema<iOwnerData>({
    userName: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
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