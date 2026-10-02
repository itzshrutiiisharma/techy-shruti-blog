import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';
import { getProjects, getProjectById } from '../controllers/project.controller';

const router = Router();

// Health Check
router.get('/health', getHealth);

// Projects API
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);

export default router;
