import { Task } from '../models/Task.js';

//Crear tarea
const createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create ( req.body );
    res.status(201).json( newTask );
  } catch ( error ) {
    next(error);
  };
};

//Obtener todas las tareas
const getAllTasks = async (req, res, next) => {
  try {
    const getAllTasks = await Task.findAll()
    res.json( getAllTasks );
  } catch (error) {
    next( error );
  };
};

//Obtener tarea por Id
const getTaskById = async (req, res, next) => {
  try {
    const getTaskById = await Task.findByPk( req.params.id )
    if( !getTaskById ) return res.status(400).json({ error: `Tarea no encontrada` });
    res.json( getTaskById );
  } catch (error) {
    next( error );
  };
};

//Actualizar tarea
const updateTask = async (req, res, next) => {
  try {
    const updateTaskById = await Task.findByPk( req.params.id )
    if (!updateTaskById ) return res.status(400).json({ error: "Tarea no encontrada" });
    await updateTaskById.update(req.body);
    res.json( updateTaskById );
  } catch (error) {
    next( error );
  };
};

//Eliminar tarea
const deleteTask = async (req, res, next) => {
  try {
    const deleteTaskById = await Task.findByPk(req.params.id);
    if (!deleteTaskById) return res.status(400).json({ error: "Tarea no encontrada" });
    await deleteTaskById.destroy();
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    next( error );
  }
};

export const TaskController = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};