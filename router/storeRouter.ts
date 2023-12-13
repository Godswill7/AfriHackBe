import { Router } from "express";
import { createStore, deleteOwnerStore, findOwnerStore } from "../controller/storeController";


const router = Router();

router.route("/:userID/create-store").post(createStore)
router.route("/:userID/find-owner-store").get(findOwnerStore)
router.route("/:storeID/delete-owner-store").delete(deleteOwnerStore)

export default router