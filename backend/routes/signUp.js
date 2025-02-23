import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', (req,res)=>{
    console.log('Post /register');
    res.send("register Route");
});

export default router;