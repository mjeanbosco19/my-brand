import { Router } from 'express';
import {
  getAllComments,
  setBlogUserIds,
  createComment,
  getComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllComments)
  .post(setBlogUserIds, createComment);

router
  .route('/:id')
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);

export default router;
