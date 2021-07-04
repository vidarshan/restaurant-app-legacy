import asyncHandler from 'express-async-handler';
import Categories from '../models/CategoriesModel.js';

/**
 * @Description : Get all categories
 * @Route       : GET /api/categories
 * @Access      : Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find({});

  res.json(categories);
});

/**
 * @Description : Add a new category
 * @Route       : POST /api/categories
 * @Access      : Private-Admin
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
 * @Description : Update a product
 * @Route       : PUT /api/categories/:id
 * @Access      : Private-admin
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

/**
 * @Description : Delete a category
 * @Route       : DELETE /api/categories/:id
 * @Access      : Private-admin
 */
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
