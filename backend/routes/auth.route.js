import express from 'express';
import { googleAuth, signup, singin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',signup)
router.post('/signin', singin); // Assuming you want to use the same controller for signin
router.post('/google',googleAuth)


export default router;
