const express = require('express');
const blogController = require('./../controllers/blogController');
const authController = require('./../controllers/authController');
const commentRouter = require('./../routes/commentRoutes');

const router = express.Router();

// router.param('id', blogController.checkID);

// POST /blog/234fad4/comments 
// GET /blog/234fad4/comments

router.use('/:blogId/comments', commentRouter);

router
  .route('/top-5-cheap')
  .get(blogController.aliasTopBlogs, blogController.getAllBlogs);

router.route('/blog-stats').get(blogController.getBlogStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    blogController.getMonthlyPlan
  );

router
  .route('/blogs-within/:distance/center/:latlng/unit/:unit')
  .get(blogController.getBlogsWithin);
// /blogs-within?distance=233&center=-40,45&unit=mi
// /blogs-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(blogController.getDistances);

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.createBlog
  );

router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.deleteBlog
  );

module.exports = router;
