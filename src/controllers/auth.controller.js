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
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  res.cookie('token', token);
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};

const logout = async(req, res) => {
  res.cookie( 'token', '', {expires: new Date(0)});
  return res.sendStatus(200);
}

//Ruta protegida
const profile = async( req, res, next ) => {
  try {
    const user = await User.findOne({ where: { username:req.user.username } });
    res.json( user );
  } catch (error) {
    next( error );
  }
}

const verifyToken = async (req, res) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];;
  if (!token) return res.send(false);

  jwt.verify(token, process.env.JWT_SECRET,  async(err, user) => {
    if (err) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const AuthController = {
  login,
  logout,
  profile,
  verifyToken
}