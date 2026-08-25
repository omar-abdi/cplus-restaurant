
import {Router} from 'express';
import{onlyAdminRoute } from '../onlyAdmin.js';
import {protectRoute} from "../utillas/protectRoute.js";  

import {createmenu ,getProduct} from '../controllers/food.js';
const router = Router();    
router.post("/createmenu" , createmenu);
router.get("/product" , getProduct);
export default router;