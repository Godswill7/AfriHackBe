import { Router } from "express";
import { createStoreOwner, deleteOwner, findAllOwner, findOneOwner, signInOwner, verifyOwner } from "../controller/ownerController";

const router = Router();

router.route("/create-owner").post(createStoreOwner);
router.route("/sign-in-owner").post(signInOwner);
router.route("/:ownerID/verify-owner").patch(verifyOwner);
router.route("/:ownerID/find-one-owner").get(findOneOwner);
router.route("/find-all-owners").get(findAllOwner);
router.route("/:ownerID/delete-user").delete(deleteOwner);

export default router;
