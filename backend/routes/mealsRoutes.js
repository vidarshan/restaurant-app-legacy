import express from 'express';
import {
  getMeals,
  getMealsById,
  getMealsByCategories,
  getMealsByOrders,
  addMeal,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getMeals).post(protect, admin, addMeal);
router.route('/most').get(getMealsByOrders);
router
  .route('/:id')
  .get(getMealsById)
  .put(protect, admin, updateMeal)
  .delete(protect, admin, deleteMeal);
router.route('/category/:name').get(getMealsByCategories);

export default router;
