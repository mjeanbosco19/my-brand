const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
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
      // validate: [validator.isAlpha, 'blog name must only contain characters']
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
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
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
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// blogSchema.index({ price: 1 });
blogSchema.index({ price: 1, ratingsAverage: -1 });
blogSchema.index({ slug: 1 });
blogSchema.index({ startLocation: '2dsphere' });

blogSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

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

// blogSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

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

module.exports = Blog;
