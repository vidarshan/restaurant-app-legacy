import express from 'express';
import {
  getMeals,
  getMealsById,
  getMealsByCategories,
  getMealsByOrders,
} from '../controllers/mealController.js';

const router = express.Router();

router.route('/').get(getMeals);
router.route('/most').get(getMealsByOrders);
router.route('/:id').get(getMealsById);
router.route('/category/:name').get(getMealsByCategories);

export default router;
