import Comment from './../models/commentModel.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';
// const catchAsync = require('./../utils/catchAsync');

export function setBlogUserIds(req, res, next) {
  // Allow nested routes
  if (!req.body.blog) req.body.blog = req.params.blogId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

export const getAllComments = getAll(Comment);
export const getComment = getOne(Comment);
export const createComment = createOne(Comment);
export const updateComment = updateOne(Comment);
export const deleteComment = deleteOne(Comment);
