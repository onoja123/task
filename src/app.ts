import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Use the cors middleware to enable CORS
app.use(cors());

// Use the user routes
app.use('/api/v1', userRoutes);

app.use("*", (_, res: Response) => {
    return res.status(404).json({
      status: 'error',
      message: "Route not found",
    });
  });
  
app.get("/", (_, res: Response) => {
    return res.status(200).send("Api is up and running 🚀");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
