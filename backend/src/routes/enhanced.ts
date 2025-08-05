import express from 'express';
import {
  rateComment,
  replyToComment,
  likeComment,
  getLeaderboard,
  advancedSearch
} from '../controllers/enhancedController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Comment interactions
router.post('/cases/:caseId/comments/:commentId/rate', authenticate, rateComment);
router.post('/cases/:caseId/comments/:commentId/reply', authenticate, replyToComment);
router.post('/cases/:caseId/comments/:commentId/like', authenticate, likeComment);

// Leaderboard
router.get('/leaderboard', authenticate, getLeaderboard);

// Advanced search
router.get('/search', authenticate, advancedSearch);

export default router;
