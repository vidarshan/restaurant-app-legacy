import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import { mdiDelete } from '@mdi/js';

const OrderScreen = ({ match, location, history }) => {
  const mealId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // const size = location.search ? location.search.split('size=')[1] : 1;
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
                {/* <div className='quantity-container'>
                  <div class='num-block skin-2'>
                    <div class='num-in'>
                      <span
                        class='minus dis'
                        //onClick={() => setQuantityAndQuantityPrice('d')}
                      ></span>
                      <input
                        type='text'
                        class='in-num default-font'
                        value={qty}
                        readonly=''
                      />
                      <span
                        class='plus'
                        // onClick={() => setQuantityAndQuantityPrice('i')}
                      ></span>
                    </div>
                  </div>
                </div> */}

                {/* <Link
                  className='remove-from-order-button'
                  onClick={() => removeFromOrderHandler(o.meal)}>
                  Remove
                </Link> */}
                <div className='order-list-item'>
                  <Icon
                    path={mdiDelete}
                    size={1}
                    color='#e14c38'
                    onClick={() => removeFromOrderHandler(o.meal)}
                  />
                </div>
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
