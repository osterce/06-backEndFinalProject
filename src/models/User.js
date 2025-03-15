import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Task } from './Task.js';

// Restriciones
// nombreUsuario unico
// email unico
// password minimo 8 caracteres

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany( Task, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});

Task.belongsTo( User, {
  foreignKey: 'user_id',
  targetId: 'id'
});