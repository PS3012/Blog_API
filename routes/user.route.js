import { Router } from "express";
import handleUserSignUp from "../controllers/user/signUp.js";
import handleUserLogin from "../controllers/user/login.js";
import handleUserLogout from "../controllers/user/logout.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", checkAuth, handleUserLogout);

export default router;
