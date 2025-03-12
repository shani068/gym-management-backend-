import { Router } from "express";
import { getUserDetailsById, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller";
import { verifyJwt } from "../middlewares/auth.middleware";



const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/update-profile").put(verifyJwt, updateProfile)
router.route("/user-details").get(verifyJwt, getUserDetailsById)


export default router;