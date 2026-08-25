import { Router } from "express";
import { createOrder , getUserOrders } from "../controllers/order.js";
import { protectRoute  } from "../utillas/protectRoute.js";
const router = Router();

router.post("/createorder" , protectRoute, createOrder);
router.get("/user/:id" , protectRoute, getUserOrders);


export default router;