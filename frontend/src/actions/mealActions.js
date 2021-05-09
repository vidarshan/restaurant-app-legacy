import axios from 'axios';
import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
} from '../constants/mealConstants';

export const listMeals = () => async (dispatch) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST });

    const { data } = await axios.get('/api/meals');

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
