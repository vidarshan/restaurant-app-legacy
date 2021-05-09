import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import meals from './data/meals.js';
import drinks from './data/drinks.js';
import users from './data/users.js';
import Meal from './models/MealsModel.js';
import Drink from './models/DrinksModel.js';
import User from './models/UserModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Meal.deleteMany();
    await Drink.deleteMany();
    await User.deleteMany();

    await Meal.insertMany(meals);
    await Drink.insertMany(drinks);
    await User.insertMany(users);

    console.log('Data Imported...'.green.bold);
  } catch (error) {
    console.error(`${error}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Meal.deleteMany();
    await Drink.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...'.green.bold);
  } catch (error) {
    console.error(`${error}`.red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
