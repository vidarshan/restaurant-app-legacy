import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const variationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    addedPrice: { type: Number, required: true },
    contents: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const mealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    orders: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: { reviewSchema },
    description: {
      type: String,
      required: true,
    },
    variations: { variationSchema },
    sizes: {
      type: Array,
      required: false,
    },
    addons: {
      type: Array,
      required: false,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
