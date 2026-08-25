import {Router} from 'express';
import {createDrink} from '../controllers/drinks.js';
const router = Router();

router.post("/add",createDrink);



export default router;