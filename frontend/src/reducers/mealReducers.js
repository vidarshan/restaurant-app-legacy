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

export const mealRecommendationReducer = (state = { meals: [] }, action) => {
  switch (action.type) {
    case MEAL_RECOMMENDATIONS_REQUEST:
      return { loading: true, meals: [] };
    case MEAL_RECOMMENDATIONS_SUCCESS:
      return { loading: false, meals: action.payload };
    case MEAL_RECOMMENDATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
