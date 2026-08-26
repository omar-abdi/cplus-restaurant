import {Router} from 'express';
import {createDrink , getDrinks , getDrinkById} from '../controllers/drinks.js';
const router = Router();

router.post("/add",createDrink);
router.get("/get" , getDrinks);

router.get("/get/:id" , getDrinkById);



export default router;