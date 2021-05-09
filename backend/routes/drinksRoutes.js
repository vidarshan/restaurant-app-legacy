import express from 'express';
import asyncHandler from 'express-async-handler';

import Drinks from '../models/DrinksModel.js';

const router = express.Router();

/*
 * GET all drinks
 * /api/drinks/
 * Public Access
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const drinks = await Drinks.find({});
    res.json(drinks);
  })
);

/*
 * GET a drink by id
 * /api/drinks/:id
 * Public Access
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const drink = await Drinks.findById(req.params.id);

    if (drink) {
      res.json(drink);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
