import Sequelize from "sequelize";

export const sequelize = new Sequelize( 'course-db', 'alumno', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});