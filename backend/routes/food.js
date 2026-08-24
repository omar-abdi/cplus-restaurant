
import {Router} from 'express';
import {createmenu ,getfood} from '../controllers/food.js';
const router = Router();    
router.post("/createmenu" , createmenu);
router.get("/getfood" , getfood);
export default router;