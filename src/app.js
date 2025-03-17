import express from 'express';
import cors from 'cors';

import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

//middlewares
app.use( express.json() );
app.use( cors() );

app.use( userRoutes );
app.use( taskRoutes );
app.use( authRoutes );

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

export default app;