import { Router } from 'express';
import { aliasTopBlogs, getAllBlogs, getBlogStats, createBlog, getBlog, updateBlog, deleteBlog } from './../controllers/blogController';
import { protect, restrictTo } from './../controllers/authController';
import commentRouter from './../routes/commentRoutes';

const router = Router();

// router.param('id', blogController.checkID);

// POST /blog/234fad4/comments 
// GET /blog/234fad4/comments

router.use('/:blogId/comments', commentRouter);

router
  .route('/top-5-cheap')
  .get(aliasTopBlogs, getAllBlogs);

router.route('/blog-stats').get(getBlogStats);



router
  .route('/')
  .get(getAllBlogs)
  .post(
    protect,
    restrictTo('admin', 'lead-guide'),
    createBlog
  );

router
  .route('/:id')
  .get(getBlog)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    updateBlog
  )
  .delete(
    protect,
    restrictTo('admin', 'lead-guide'),
    deleteBlog
  );

export default router;
