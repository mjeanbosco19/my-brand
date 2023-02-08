const Comment = require('./../models/commentModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.setBlogUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.blog) req.body.blog = req.params.blogId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
