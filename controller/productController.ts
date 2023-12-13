import { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import productModel from "../model/productModel";
import { streamUpload } from "../utils/streamifier";
import ownerModel from "../model/ownerModel";

export const createProduct = async (req: any, res: any): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { name, description, price } = req.body;

    const findUser = await ownerModel.findById(userID);

    let image = await streamUpload(req);

    if (findUser?.role === "storeOwner") {
      const products: any = await productModel.create({
        name,
        description,
        price,
        image: image.secure_url!,
        imageID: image.public_id!,
        userID,
      });

      findUser!.store!.push(products.id);
      await findUser?.save();

      return res.status(HTTP.CREATE).json({
        messsage: "Product Created",
        data: products,
      });
    } else {
      return res.status(HTTP.BAD).json({
        messsage: "You don't have the right to create Product",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating product",
    });
  }
};

export const viewAllProducts = async (req: Request, res: Response) => {
  try {
    const viewProducts = await productModel.find();

    return res.status(HTTP.OK).json({
      message: "Viewing all products",
      data: viewProducts,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing all products",
      data: error.message,
    });
  }
};

export const viewOneProducts = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const viewProducts = await productModel.findById(productID);

    return res.status(HTTP.OK).json({
      message: "Viewing one product",
      data: viewProducts,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing all products",
      data: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    await productModel.findByIdAndDelete(productID);

    return res.status(HTTP.DELETE).json({
      message: "Product Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error deleting product",
      data: error.message,
    });
  }
};
