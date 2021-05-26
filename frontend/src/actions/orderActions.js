import axios from 'axios';
import {
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_COUNT_ITEMS,
} from '../constants/orderConstants';

export const addToOrder =
  (id, qty, size, addons, notes) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/meals/${id}`);

    dispatch({
      type: ORDER_ADD_ITEM,
      payload: {
        meal: data._id,
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        qty,
        size,
        addons,
        notes,
      },
    });

    localStorage.setItem(
      'orderItems',
      JSON.stringify(getState().order.orderItems)
    );
  };

export const removeFromOrder = (id) => (dispatch, getState) => {
  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    'orderItems',
    JSON.stringify(getState().order.orderItems)
  );
};

export const countOrders = () => (dispatch) => {
  dispatch({
    type: ORDER_COUNT_ITEMS,
  });
};
