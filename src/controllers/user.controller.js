import bcrypt from 'bcryptjs';

import { Task } from '../models/Task.js';
import { User } from '../models/User.js';

//Crear usuario
const createUser = async (req, res, next) => {
  try {
    const { user, email, password } = req.body;
    const salt = await bcrypt.genSalt( 10 );
    const hashedPassword = await bcrypt.hash( password, salt );
    const newUser = await User.create ({
      user,
      email,
      password:hashedPassword
    });
    res.status(201).json( newUser );
  } catch ( error ) {
    if ( error.name === 'SequelizeUniqueConstraintError' ) {
      const field = Object.keys( error.fields )[0];
      const message = field === 'user' ? "Usuario ya existe" : "Email ya existe";
      return res.status(409).json({ message });
    }
    next(error);
  };
};

//Obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const getAllUsers = await User.findAll()
    res.json( getAllUsers );
  } catch (error) {
    next( error );
  };
};

//Obtener usuario por Id
const getUserById = async (req, res, next) => {
  try {
    const getUserById = await User.findByPk( req.params.id )
    if( !getUserById ) return res.status(400).json({ error: `Usuario no encontrado` });
    res.json( getUserById );
  } catch (error) {
    next( error );
  };
};

//Actualizar usario
const updateUser = async (req, res, next) => {
  try {
    const updateUserById = await User.findByPk( req.params.id )
    if (!updateUserById ) return res.status(400).json({ error: "Usuario no encontrado" });
    await updateUserById.update(req.body);
    res.json( updateUserById );
  } catch (error) {
    next( error );
  };
};

//Eliminar usuario
const deleteUser = async (req, res, next) => {
  try {
    const deleteUserById = await User.findByPk(req.params.id);
    if (!deleteUserById) return res.status(400).json({ error: "Usuario no encontrado" });
    await deleteUserById.destroy();
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    next( error );
  }
};

//Obtener todos las tareas de un usuario
const getAllTasksByUser = async(req, res, next) => {
  try {
    const { id } = req.params;
    const tasksByUser = await Task.findAll({
      where: { user_id: id }
    });
    res.json( tasksByUser )
  } catch (error) {
    next( error );
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllTasksByUser
};