import { Router } from "express";
import { createUser, deleteUser, findAllUser, findOneUser, signInUser, verifyUser } from "../controller/userController";


const router = Router();

router.route("/create-user").post(createUser)
router.route("/sign-in-user").post(signInUser)
router.route("/:userID/verify-user").patch(verifyUser)
router.route("/:userID/find-one-user").get(findOneUser)
router.route("/find-all-users").get(findAllUser)
router.route("/:userID/delete-user").delete(deleteUser)

export default router