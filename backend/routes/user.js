import{Router} from 'express';
import {Signup ,Login} from '../controllers/user.js';
const router = Router();

router.post("/signup" , Signup);


export default router;