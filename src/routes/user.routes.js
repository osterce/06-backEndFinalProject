import { Router } from 'express';
import { createUser, deleteUser, getAllTasksByUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post( '/users', createUser );
router.get( '/users', getAllUsers );
router.get( '/users/:id', getUserById );
router.put( '/users/:id', updateUser );
router.delete( '/users/:id', deleteUser );

router.get( '/users/:id/tasks', getAllTasksByUser );

export default router;