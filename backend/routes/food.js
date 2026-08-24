
import {Router} from 'express';
import {createmenu ,getProduct} from '../controllers/food.js';
const router = Router();    
router.post("/createmenu" , createmenu);
router.get("/product" , getProduct);
export default router;