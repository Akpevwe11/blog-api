import express from 'express';
import { register, login } from '../controllers/auth.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.post('/register', register);
router.post('/login',auth, login);

module.exports = router;
    