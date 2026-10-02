import { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'online',
    service: 'TechyShruti API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    system: {
      platform: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
    },
  });
};
