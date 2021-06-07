import mongoose from 'mongoose';

const categoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;