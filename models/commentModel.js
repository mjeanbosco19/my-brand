// comment / like / createdAt / ref to blog / ref to user
import { Schema, model } from 'mongoose';
import Blog from './blogModel';

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!']
    },
    like: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    blog: {
      type: Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a blog.']
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.index({ blog: 1, user: 1 }, { unique: true });

commentSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'blog',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

commentSchema.statics.calcAverageLikes = async function(blogId) {
  const stats = await this.aggregate([
    {
      $match: { blog: blogId }
    },
    {
      $group: {
        _id: '$blog',
        nLike: { $sum: 1 },
        avgLike: { $avg: '$like' }
      }
    }
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Blog.findByIdAndUpdate(blogId, {
      likesQuantity: stats[0].nLike,
      likesAverage: stats[0].avgLike
    });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      likesQuantity: 0,
      likesAverage: 4.5
    });
  }
};

commentSchema.post('save', function() {
  // this points to current comment
  this.constructor.calcAverageLikes(this.blog);
});

// findByIdAndUpdate
// findByIdAndDelete
commentSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

commentSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageLikes(this.r.blog);
});

const Comment = model('Comment', commentSchema);

export default Comment;
