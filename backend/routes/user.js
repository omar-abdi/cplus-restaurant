import { Router } from "express";
import { Signup, Login, getAllUsers } from "../controllers/user.js";
import { protectRoute } from "../utillas/protectRoute.js";
import { onlyAdminRoute } from "../onlyAdmin.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/all", protectRoute, onlyAdminRoute, getAllUsers);

export default router;