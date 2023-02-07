const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A blog must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A blog name must have less or equal then 40 characters'],
      minlength: [10, 'A blog name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Blog name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A blog must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A blog must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A blog must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A blog must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// blogSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// blogSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// blogSchema.pre('find', function(next) {
blogSchema.pre(/^find/, function(next) {
  this.find({ secretBlog: { $ne: true } });

  this.start = Date.now();
  next();
});

blogSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
blogSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretBlog: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
