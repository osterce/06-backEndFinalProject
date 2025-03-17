import { Router } from 'express';
import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.post( '/users', UserController.createUser );
router.get( '/users', UserController.getAllUsers );
router.get( '/users/:id', UserController.getUserById );
router.put( '/users/:id', UserController.updateUser );
router.delete( '/users/:id', UserController.deleteUser );

router.get( '/users/:id/tasks', UserController.getAllTasksByUser );

export default router;