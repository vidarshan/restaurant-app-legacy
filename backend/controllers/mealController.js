import asyncHandler from 'express-async-handler';
import Meal from '../models/MealsModel.js';
import orderBy from 'lodash.orderby';
import take from 'lodash.take';

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

/**
 * @DESCRIPTION : Get meals by category
 * @ROUTE       : GET /api/meals/:category
 * @ACCESS      : Public Access
 */
const getMealsByCategories = asyncHandler(async (req, res) => {
  const meals = await Meal.find({
    foodType: req.params.name,
  });

  if (meals) {
    res.json(meals);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

/**
 * @DESCRIPTION : Get most ordered meals
 * @ROUTE       :GET /api/meals/most
 * @ACCESS      :Public Access
 */
const getMealsByOrders = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});

  let sortedbyMostOrders = take(orderBy(meals, ['orders'], ['desc']), 6);
  res.json(sortedbyMostOrders);
});

export { getMeals, getMealsById, getMealsByCategories, getMealsByOrders };
