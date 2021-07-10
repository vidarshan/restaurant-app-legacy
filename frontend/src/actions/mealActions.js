import axios from 'axios';
import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_RECOMMENDATIONS_REQUEST,
  MEAL_RECOMMENDATIONS_SUCCESS,
  MEAL_RECOMMENDATIONS_FAIL,
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_ADD_REQUEST,
  MEAL_ADD_SUCCESS,
  MEAL_ADD_FAIL,
} from '../constants/mealConstants';

export const listMeals = (category) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST });

    if (category) {
      let { data } = await axios.get(`/api/meals/category/${category}`);
      dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
    } else {
      let { data } = await axios.get(`/api/meals`);
      dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
    }
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

export const mealRecommendation = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_RECOMMENDATIONS_REQUEST });

    const { data } = await axios.get(`/api/meals/most`);

    dispatch({ type: MEAL_RECOMMENDATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MEAL_RECOMMENDATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const mealCreate = (meal) => async (dispatch, getState) => {
  console.log(meal);

  try {
    dispatch({
      type: MEAL_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.post(`/api/meals`, meal, config);

    dispatch({
      type: MEAL_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
