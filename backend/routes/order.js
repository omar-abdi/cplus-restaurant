import { Router } from "express";
import { createOrder } from "../controllers/order.js";
import { protectRoute } from "../utillas/protectRoute.js";
const router = Router();

router.post("/createorder" , protectRoute, createOrder);

export default router;