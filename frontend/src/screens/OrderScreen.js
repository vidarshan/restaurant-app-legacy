import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';

const OrderScreen = ({ match, location, history }) => {
  const mealId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const size = '';
  console.log(location);

  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const { orderItems } = order;

  const removeFromOrderHandler = (id) => {
    console.log(id);
    console.log(orderItems);
    dispatch(removeFromOrder(id));
  };

  useEffect(() => {
    if (mealId) {
      dispatch(addToOrder(mealId, qty, size));
    }
  }, [dispatch, mealId, qty]);

  return (
    <section className='section bd-container' id='menu'>
      <div className='flex-container'>
        <div class='flex-item-left'>
          {orderItems.map((o) => {
            return (
              <div className='order-list-container'>
                <div className='order-list-item'>
                  <div className='order-list-item-image'>
                    <img width='70' height='70' src={o.image} alt=' ' />
                  </div>
                </div>
                <div className='order-list-text'>{o.name}</div>
                <div className='order-list-text'>{o.qty}</div>
                <div className='order-list-text'>{o.price}</div>

                <Link
                  className='remove-from-order-button'
                  onClick={() => removeFromOrderHandler(o.meal)}>
                  <box-icon name='trash' color='#ba2828'></box-icon>
                </Link>
                <div className='order-list-item'></div>
              </div>
            );
          })}
        </div>
        <div className='flex-item-right'>
          <h1>hi</h1>
        </div>
      </div>
    </section>
  );
};

export default OrderScreen;
