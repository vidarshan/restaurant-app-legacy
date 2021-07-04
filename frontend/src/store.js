import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  mealListReducer,
  mealReducer,
  mealRecommendationReducer,
} from './reducers/mealReducers';
import { orderReducer, orderCountReducer } from './reducers/orderReducer';
import { categoryReducer } from './reducers/categoryReducers';
import {
  userSignUpReducer,
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  mealList: mealListReducer,
  mealItem: mealReducer,
  mealRecommendation: mealRecommendationReducer,
  order: orderReducer,
  userSignup: userSignUpReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCount: orderCountReducer,
  categories: categoryReducer,
});

const orderItemsFromStorage = localStorage.getItem('orderItems')
  ? JSON.parse(localStorage.getItem('orderItems'))
  : [];

const countOrderItemsFromStorage = localStorage.getItem('orderItems')
  ? JSON.parse(localStorage.getItem('orderItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  order: { orderItems: orderItemsFromStorage },
  orderCount: { orderCount: countOrderItemsFromStorage.length },
  userLogin: { userInfo: userInfoFromStorage },
  userSignup: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
