// import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import slugify from 'slugify';
// const User = require('./userModel');
// const validator = require('validator');
const schema = mongoose.Schema;
const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A blog must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A blog name must have less or equal then 40 characters'],
      minlength: [10, 'A blog name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'blog name must only contain characters']
    },
    slug: String,
    category: {
      type: String,
      required: [true, 'A blog must have a category'],
      enum: {
        values: ['news', 'tech', 'others'],
        message: 'category is either: news, tech, others'
      }
    },
    likesAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Like must be above 1.0'],
      max: [5, 'Like must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    likesQuantity: {
      type: Number,
      default: 0
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A blog must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A blog must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretBlog: {
      type: Boolean,
      default: false
    },

    guides: [
      {
        type: schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.index({ likesAverage: -1 });
blogSchema.index({ slug: 1 });

// Virtual populate
blogSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blog',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});



// QUERY MIDDLEWARE
// blogSchema.pre('find', function(next) {
blogSchema.pre(/^find/, function(next) {
  this.find({ secretBlog: { $ne: true } });

  this.start = Date.now();
  next();
});

blogSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });

  next();
});

blogSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// blogSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretBlog: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
