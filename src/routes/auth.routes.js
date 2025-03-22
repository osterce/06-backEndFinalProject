import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyTokenAuth } from "../middleware/jwt.middlware.js";
import { validateSchema } from "../middleware/validator.middlware.js";
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import { UserController } from '../controllers/user.controller.js';


const router = Router();

router.post( '/register', validateSchema( registerSchema ), UserController.createUser );
router.post( '/login', validateSchema( loginSchema ), AuthController.login );
router.post( '/logout', AuthController.logout);
router.get( '/verify', AuthController.verifyToken );
router.get( '/profile', verifyTokenAuth, AuthController.profile );

export default router;