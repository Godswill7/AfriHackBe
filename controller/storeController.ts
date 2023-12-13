import { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import storeModel from "../model/storeModel";
import userModel from "../model/userModel";

export const createStore = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { storeName } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      if (user.verified && user.token === "") {
        const isStoreOwner = user?.role === "storeOwner";
        if (!isStoreOwner) {
          const existingStore = await storeModel.findOne({ owner: user._id });
          if (existingStore) {
            const store = await storeModel.create({
              storeName,
            });
            return res.status(HTTP.CREATE).json({
              message: "Store Created",
              data: store,
            });
          } else {
            return res.status(HTTP.BAD).json({
              message: "Store owner can only have one store.",
            });
          }
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "You are not verified to create a store",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User not found on storeOwner",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating store",
      data: error.message,
    });
  }
};

export const findOwnerStore = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { storeID } = req.params;

    const isStoreOwner = await userModel.findById(userID);

    if (isStoreOwner?.role === "storeOwner") {
      const store: any = await storeModel.findById(storeID);
      if (store) {
        return res.status(HTTP.OK).json({
          message: `you are viewing ${isStoreOwner.userName} stores`,
          data: store,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "store does not exist",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "you are not a store owner to view this",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error finding store",
      data: error.message,
    });
  }
};

export const deleteOwnerStore = async (req: Request, res: Response) => {
  try {
    const { storeID } = req.params;

    await storeModel.findByIdAndDelete(storeID);

    return res.status(HTTP.OK).json({
      message: "Store deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error deleting store",
      data: error.message,
    });
  }
};
