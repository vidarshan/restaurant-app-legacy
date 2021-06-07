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

export const mealListReducer = (state = { meals: [] }, action) => {
  switch (action.type) {
    case MEAL_LIST_REQUEST:
      return { loading: true, meals: [] };
    case MEAL_LIST_SUCCESS:
      return { loading: false, meals: action.payload };
    case MEAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealReducer = (state = { meal: {} }, action) => {
  switch (action.type) {
    case MEAL_REQUEST:
      return { loading: true, meal: {} };
    case MEAL_SUCCESS:
      return { loading: false, meal: action.payload };
    case MEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealRandomReducer = (state = { meal: {} }, action) => {
  switch (action.type) {
    case MEAL_REQUEST:
      return { loading: true, meal: {} };
    case MEAL_SUCCESS:
      return { loading: false, meal: action.payload };
    case MEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealSortByPriceReducer = (state = { meals: [] }, action) => {
  switch (action.type) {
    case MEAL_SORT_BY_PRICE_REQUEST:
      return { loading: true, meals: [] };
    case MEAL_SORT_BY_PRICE_SUCCESS:
      return { loading: false, meals: action.payload };
    case MEAL_SORT_BY_PRICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
