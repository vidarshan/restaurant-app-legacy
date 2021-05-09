import asyncHandler from 'express-async-handler';
import Meal from '../models/MealsModel.js';

/*
 * @DESCRIPTION : Get all meals
 * @ROUTE       : GET /api/meals/
 * @ACCESS      :Public Access
 */
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});
  res.json(meals);
});

/*
 * @DESCRIPTION : Get a meal by id
 * @ROUTE       :GET /api/meals/:id
 * @ACCESS      :Public Access
 */
const getMealsById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    res.json(meal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
});

export { getMeals, getMealsById };
