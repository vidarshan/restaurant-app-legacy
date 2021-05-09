import mongoose from 'mongoose';

const drinksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Drinks = mongoose.model('Drinks', drinksSchema);

export default Drinks;
