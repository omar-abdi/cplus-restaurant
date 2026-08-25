import { Router } from "express";
import { createOrder , getUserOrders  , getallOrders } from "../controllers/order.js";
import { protectRoute  } from "../utillas/protectRoute.js";
import { onlyAdminRoute } from "../onlyAdmin.js";
const router = Router();

router.post("/createorder" , protectRoute, createOrder);
router.get("/user/:id" , protectRoute, getUserOrders);
router.get("/all" , protectRoute, onlyAdminRoute, getallOrders);


export default router;
