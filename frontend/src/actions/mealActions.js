import axios from 'axios';
import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_SORT_BY_PRICE_REQUEST,
  MEAL_SORT_BY_PRICE_SUCCESS,
  MEAL_SORT_BY_PRICE_FAIL,
} from '../constants/mealConstants';
import { sortBy, orderBy, filter } from '../lodash';

export const listMeals = () => async (dispatch) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST });

    let { data } = await axios.get('/api/meals');
    // else if (sortingType.toLowerCase() === 'popularity') {
    //   results = orderBy(meals, ['timestamps'], ['desc']);
    // } else if (sortingType.toLowerCase() === 'vegan') {
    //   if (sortingOrder) {
    //     results = filter(meals, ['vegan', true]);
    //   } else {
    //     results = filter(meals, ['vegan', false]);
    //   }
    // }
    dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const mealItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_REQUEST });

    const { data } = await axios.get(`/api/meals/${id}`);

    dispatch({ type: MEAL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const mealSortByPrice = (sortingOrder) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_SORT_BY_PRICE_REQUEST });

    let { data } = await axios.get(`/api/meals`);

    let sortedData = orderBy(data, ['price'], [sortingOrder]);

    dispatch({ type: MEAL_SORT_BY_PRICE_SUCCESS, payload: sortedData });
  } catch (error) {
    dispatch({
      type: MEAL_SORT_BY_PRICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
