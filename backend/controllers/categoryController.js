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

export { getCategories };
