import { Router } from "express";
import { Signup, Login, getAllUsers , updateUser} from "../controllers/user.js";
import { protectRoute } from "../utillas/protectRoute.js";
import { onlyAdminRoute } from "../onlyAdmin.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.put("/:id" ,   protectRoute, onlyAdminRoute, updateUser);
router.get("/all", protectRoute, onlyAdminRoute, getAllUsers);

export default router;