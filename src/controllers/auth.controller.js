import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });

  const isMatch = await bcrypt.compare( password, user.password );

  if (!isMatch) return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });

  // Crear un token JWT
  const token = jwt.sign(
    { id: user.id, user: user.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  res.json({ token });
};

//Ruta protegida
const profile = async( req, res, next ) => {
  try {

    const user = await User.findOne({ where: { user:req.user.user } });
    res.json( user );
  } catch (error) {
    next( error );
  }
}

export const AuthController = {
  login,
  profile
};