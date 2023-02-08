import { Router } from 'express';
import { getAllComments, setBlogUserIds, createComment, getComment, updateComment, deleteComment } from '../controllers/commentController';
import { protect, restrictTo } from '../controllers/authController';

const router = Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllComments)
  .post(
    restrictTo('user'),
    setBlogUserIds,
    createComment
  );

router
  .route('/:id')
  .get(getComment)
  .patch(
    restrictTo('user', 'admin'),
    updateComment
  )
  .delete(
    restrictTo('user', 'admin'),
    deleteComment
  );

export default router;
