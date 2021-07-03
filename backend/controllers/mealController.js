import asyncHandler from 'express-async-handler';
import Meal from '../models/MealsModel.js';
import orderBy from 'lodash.orderby';
import take from 'lodash.take';

/**
 * @Description : Get all meals
 * @Route       : GET /api/meals
 * @Access      : Public Access
 */
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});
  res.json(meals);
});

/**
 * @Description : Get a Meal by ID
 * @Route       : GET /api/meals/:id
 * @Access      : Public Access
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
 * @Description : Get meals under a category
 * @Route       : GET /api/meals/category/:name
 * @Access      : Public Access
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
 * @Description : Get most ordered meals
 * @Route       : GET /api/meals/most
 * @Access      : Public Access
 */
const getMealsByOrders = asyncHandler(async (req, res) => {
  const meals = await Meal.find({});

  let sortedbyMostOrders = take(orderBy(meals, ['orders'], ['desc']), 6);
  res.json(sortedbyMostOrders);
});

/**
 * @Description : Add a new meal
 * @Route       : POST /api/meals
 * @Access      : Private-Admin
 */
const addMeal = asyncHandler(async (req, res) => {
  let {
    name,
    price,
    foodType,
    image,
    vegan,
    orders,
    rating,
    reviews,
    description,
    variations,
    sizes,
    addons,
    ordersThisWeek,
  } = req.body;

  const meal = new Meal({
    name,
    price,
    foodType,
    image,
    vegan,
    orders,
    rating,
    reviews,
    description,
    variations,
    sizes,
    addons,
    ordersThisWeek,
  });

  const createdMeal = await meal.save();
  res.status(201).json(createdMeal);
});

/**
 * @Description : Update a meal
 * @Route       : PUT /api/meals/:id
 * @Access      : Private-Admin
 */
const updateMeal = asyncHandler(async (req, res) => {
  let {
    name,
    price,
    foodType,
    image,
    vegan,
    orders,
    rating,
    reviews,
    description,
    variations,
    sizes,
    addons,
    ordersThisWeek,
  } = req.body;

  const meal = await Meal.findById(req.params.id);

  if (meal) {
    (meal.name = name),
      (meal.price = price),
      (meal.foodType = foodType),
      (meal.image = image),
      (meal.vegan = vegan),
      (meal.orders = orders),
      (meal.rating = rating),
      (meal.reviews = reviews),
      (meal.description = description),
      (meal.variations = variations),
      (meal.sizes = sizes),
      (meal.addons = addons),
      (meal.ordersThisWeek = ordersThisWeek);

    const updatedMeal = await meal.save();
    res.status(201).json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
});

/**
 * @Description : Delete a meal
 * @Route       : DELETE /api/meals/:id
 * @Access      : Private-Admin
 */
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    await meal.remove();
    res.json({ message: 'Meal Removed' });
  } else {
    res.status(404);
    throw new Error('Meal not found');
  }
});

export {
  getMeals,
  getMealsById,
  getMealsByCategories,
  getMealsByOrders,
  addMeal,
  updateMeal,
  deleteMeal,
};
