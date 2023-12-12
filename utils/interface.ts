import { Document, Types } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  password: string;
  verified: boolean;
  token: string;
  role: string;
  store?:iStore[]
}
interface iOwner extends iUser {
  store: iStore[],
}

interface iStore {
  storeName: string;
  product: iProduct[];
  userID: string;
}
interface iProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  imageID: string;
}

export interface iUserData extends iUser, Document {}
export interface iOwnerData extends iOwner, Document {}
export interface iStoreData extends iStore, Document {}
export interface iProductData extends iProduct, Document {}
