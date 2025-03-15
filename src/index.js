import app from './app.js';
import { sequelize } from './database/database.js';

/* import './models/User.js';
import './models/Task.js'; */

async function main() {
  try{
    await sequelize.sync({force:false});
    app.listen(3000);
    console.log('Server is listening on port', 3000);
  } catch (error){
    console.log( 'Unable to connect to the database:', error );
  }
}

main();