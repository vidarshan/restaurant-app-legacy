import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/UserModel.js';

/**
 * @Description : Auth user and get a tokenUpdate a meal
 * @Route       : POST /api/users/login
 * @Access      : Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @Description : Register a user
 * @Route       : POST /api/users/
 * @Access      : Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @Description : Get user profile
 * @Route       : POST /api/users/profile
 * @Access      : Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @Description : Update user profile
 * @Route       : PUT /api/users/profile
 * @Access      : Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log(req.user._id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @Description : Delete user profile
 * @Route       : DELETE /api/users/profile
 * @Access      : Private
 */
const deleteUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    res.json({ message: 'Profile Removed' });
  } else {
    res.status(404);
    throw new Error('Error deleting profile');
  }
});

/**
 * @Description : Get all users
 * @Route       : GET /api/users
 * @Access      : Private-Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @Description : Make a user an admin
 * @Route       : PUT /api/users/:id
 * @Access      : Private
 */
const makeAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    (user.name = user.name),
      (user.email = user.email),
      user.isAdmin ? (user.isAdmin = false) : (user.isAdmin = true);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @Description : Delete a user
 * @Route       : DELETE /api/users/:id
 * @Access      : Private-Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User Removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  makeAdmin,
  getAllUsers,
  deleteUser,
};
