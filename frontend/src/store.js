import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mealListReducer, mealReducer } from './reducers/mealReducers';
import { orderReducer } from './reducers/orderReducer';
import {
  userSignUpReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  mealList: mealListReducer,
  mealItem: mealReducer,
  order: orderReducer,
  userSignup: userSignUpReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const orderItemsFromStorage = localStorage.getItem('orderItems')
  ? JSON.parse(localStorage.getItem('orderItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  order: { orderItems: orderItemsFromStorage },
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
