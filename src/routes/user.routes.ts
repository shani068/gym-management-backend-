import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { verifyJwt } from "../middlewares/auth.middleware";



const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser)


export default router;