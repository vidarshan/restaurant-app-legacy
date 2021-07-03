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

// import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getMeals).post(addMeal);
router.route('/most').get(getMealsByOrders);
router.route('/:id').get(getMealsById).put(updateMeal).delete(deleteMeal);
router.route('/category/:name').get(getMealsByCategories);

export default router;
