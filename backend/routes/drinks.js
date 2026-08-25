import {Router} from 'express';
import {createDrink , getDrinks} from '../controllers/drinks.js';
const router = Router();

router.post("/add",createDrink);
router.get("/get" , getDrinks);



export default router;