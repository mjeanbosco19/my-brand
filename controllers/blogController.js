import Blog from './../models/blogModel';
import catchAsync from './../utils/catchAsync';
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory';
import AppError from './../utils/appError';

export function aliasTopBlogs(req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-likesAverage';
  req.query.fields = 'name,likesAverage,summary,category';
  next();
}

export const getAllBlogs = getAll(Blog);
export const getBlog = getOne(Blog, { path: 'comments' });
export const createBlog = createOne(Blog);
export const updateBlog = updateOne(Blog);
export const deleteBlog = deleteOne(Blog);

export const getBlogStats = catchAsync(async (req, res, next) => {
  const stats = await Blog.aggregate([
    {
      $match: { likesAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$category' },
        numBlogs: { $sum: 1 },
        numLikes: { $sum: '$likesQuantity' },
        avgLike: { $avg: '$likesAverage' }
      }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
