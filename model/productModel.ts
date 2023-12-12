import { iProductData } from './../utils/interface';
import { Schema, model } from "mongoose";


const productModel = new Schema<iProductData>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iProductData>("products",productModel)