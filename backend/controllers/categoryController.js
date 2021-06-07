import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Categories from '../models/CategoriesModel.js';

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find({});

  res.json(categories);
});

/**
 * @DESCRIPTION Update user profile
 * @ROUTE PUT /api/users/profile
 * @ACCESS Private
 */
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     (user.name = req.body.name || user.name),
//       (user.email = req.body.email || user.email);

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found.');
//   }
// });

export { getCategories };
