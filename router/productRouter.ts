import { Router } from 'express';
import { createProduct, deleteProduct, viewAllProducts, viewOneProducts } from '../controller/productController';
import multer from "multer";
let uploadData = multer();


const router = Router()

router.route("/:userID/create-product").post(uploadData.single("image"), createProduct)



router.route("/view-product").get(viewAllProducts)
router.route("/:productID/view-products").delete(viewOneProducts);
router.route("/:productID/delete-product").delete(deleteProduct)

export default router