import express from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCategories).post(protect, admin, addCategory);
router
  .route('/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
