import express from 'express';
import {
  getMeals,
  getMealsById,
  getMealsByOrders,
} from '../controllers/mealController.js';

const router = express.Router();

router.route('/').get(getMeals);
router.route('/most').get(getMealsByOrders);
router.route('/:id').get(getMealsById);

export default router;
