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

export { getOrders };
