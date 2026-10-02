import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import apiRouter from './routes/api.router';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security & Utility Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Mount API Router
app.use(env.API_PREFIX, apiRouter);

// 404 Route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handling
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 TechyShruti Backend API Running!`);
    console.log(`📡 URL: http://localhost:${env.PORT}${env.API_PREFIX}`);
    console.log(`🏥 Health: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
    console.log(`=========================================`);
  });
}

export default app;
