import express from 'express';
import { googleAuth, signout, signup, singin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin",singin );
router.post('/google', googleAuth);
router.get('/signout', signout)

export default router;