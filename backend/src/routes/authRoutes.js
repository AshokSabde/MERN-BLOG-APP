import express from 'express';
import { getUser, login, register } from '../controllers/userController.js';

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/user/:userId",getUser);


export default router;