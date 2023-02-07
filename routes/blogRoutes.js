const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', blogController.checkID);

router
  .route('/top-5-cheap')
  .get(blogController.aliasTopBlogs, blogController.getAllBlogs);

router.route('/blog-stats').get(blogController.getBlogStats);
router.route('/monthly-plan/:year').get(blogController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.deleteBlog
  );

module.exports = router;
