import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import patientRoutes from './patients';
import doctorRoutes from './doctors';
import caseRoutes from './cases';
import enhancedRoutes from './enhanced';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Healthcare API is running!',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      patients: '/api/patients',
      doctors: '/api/doctors',
      cases: '/api/cases',
      leaderboard: '/api/leaderboard',
      search: '/api/search'
    }
  });
});

router.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'Test route is working!',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
router.use('/auth', authRoutes);

// Patient routes
router.use('/patients', patientRoutes);

// Doctor routes
router.use('/doctors', doctorRoutes);

// Case routes
router.use('/cases', caseRoutes);

// Enhanced features routes
router.use('/', enhancedRoutes);

export default router;
