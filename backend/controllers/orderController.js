import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';

/**
 * @Description : Get all orders
 * @Route       : GET /api/orders/
 * @Access      : Private Access
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

/**
 * @DESCRIPTION  : Add to order
 * @Route        : POST /api/orders
 * @Access       : Private access
 */

/*
 * @DESCRIPTION : Get a meal by id
 * @ROUTE       :GET /api/meals/:id
 * @ACCESS      :Public Access
 */
// const getMealsById = asyncHandler(async (req, res) => {
//   const meal = await Meal.findById(req.params.id);

//   if (meal) {
//     res.json(meal);
//   } else {
//     res.status(404);
//     throw new Error('Meal not found');
//   }
// });

export { getOrders };
