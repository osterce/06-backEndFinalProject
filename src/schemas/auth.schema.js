import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Nombre de usuario es requerido'
  }).min(3, {
    message: 'Debe tener mínimo 3 caracteres'
  }),
  email: z.string({
    required_error: 'Email es requerido'
  }).email({
    message: 'Email invalido'
  }),
  password: z.string({
    required_error: 'Contraseña es requerida'
  }).min(6, {
    message: 'La contraseña de tener mínimo 6 caracteres'
  }),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email es requerido'
  }).email({
    message: 'Email invalido'
  }),
  password: z.string({
    required_error: 'Contraseña es requerida'
  }).min(6, {
    message:'La contraseña debe tener mínimo 6 caracteres'
  }),
});