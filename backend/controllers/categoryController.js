import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Categories from '../models/CategoriesModel.js';

/**
 * @DESCRIPTION Get all categories
 * @ROUTE GET /api/categories
 * @ACCESS Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find({});

  res.json(categories);
});

/**
 * @DESCRIPTION : Add a new category
 * @ROUTE       : POST /api/categories
 * @ACCESS      : Private-Admin
 */
const addCategory = asyncHandler(async (req, res) => {
  let { name, image } = req.body;

  const category = new Categories({
    name,
    image,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

/**
 * @desc         Update a product
 * @route        PUT /api/meals
 *@access        Private-admin
 */
const updateCategory = asyncHandler(async (req, res) => {
  let { name, image } = req.body;

  const category = await Categories.findById(req.params.id);

  if (category) {
    (category.name = name), (category.image = image);

    const updatedCategory = await category.save();
    res.status(201).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Categories.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: 'Category Removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export { getCategories, addCategory, updateCategory, deleteCategory };
