import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/jwt.middlware.js";


const router = Router();

router.post( '/login', AuthController.login );
router.get( '/profile', verifyToken, AuthController.profile );

export default router;