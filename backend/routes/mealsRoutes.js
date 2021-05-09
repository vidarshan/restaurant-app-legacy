import express from 'express';
import { getMeals, getMealsById } from '../controllers/mealController.js';

const router = express.Router();

router.route('/').get(getMeals);
router.route('/:id').get(getMealsById);

export default router;
