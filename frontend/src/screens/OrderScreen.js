import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';
import { map, forEach } from 'lodash';

const OrderScreen = ({ match, location, history }) => {
  var randomColor = require('randomcolor');

  const mealId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const size = '';

  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const { orderItems } = order;

  const removeFromOrderHandler = (id) => {
    dispatch(removeFromOrder(id));
  };

  useEffect(() => {
    if (mealId) {
      dispatch(addToOrder(mealId, qty, size));
    }
  }, [dispatch, mealId, qty]);

  return (
    <section className='section bd-container-order' id='menu'>
      <div class='order-list'>
        <div className='order-item-grid'>
          <div className='order-item-category'>
            Pizza <Emoji symbol='🍕' />
          </div>
          {map(orderItems, (o) => {
            return (
              <div className='order-item'>
                <div className='responsive-image-title-description-addOns'>
                  <div className='order-item-image'>
                    <img src={o.image} alt=' ' />
                  </div>
                  <div className='title-description-addons-container'>
                    <div className='order-item-title'>{o.name}</div>
                    <div className='order-item-description'>
                      best Pizza that tastes like no other
                    </div>
                    <div className='order-item-addOns'>
                      {map(o.addons.current, (e) => {
                        return <div className='addOn'>{e}</div>;
                      })}
                    </div>
                  </div>
                </div>
                <div className='responsive-qty-total-remove'>
                  <div className='order-item-unit-quantity'>
                    <div className='order-quantity'>{o.qty} nos.</div>
                  </div>
                  <div className='total-price-unit-quantity-container'>
                    <div className='order-total-price'>{o.qty * o.price}</div>
                  </div>
                  <div className='order-item-remove'>
                    <div
                      className='order-remove-btn-container'
                      onClick={() => removeFromOrderHandler(o.meal)}>
                      <box-icon
                        size='20px'
                        color='#e14c38'
                        name='trash'></box-icon>
                      <div className='order-remove-btn-txt'>Remove</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class='order-summary'>
        <div className='order-summary-container'>
          <div className='order-summary-grid'>
            <div className='order-summary-left'>
              <div className='order-summary-total-title'>Gross Total</div>
            </div>
            <div className='order-summary-right'>
              <div className='order-summary-total-price'>300.00</div>
            </div>
          </div>
          <div className='order-summary-grid'>
            <div className='order-summary-left'>
              <div className='order-summary-total-title'>Items</div>
            </div>
            <div className='order-summary-right'>
              <div className='order-summary-total-price'>3</div>
            </div>
          </div>
          <div className='order-summary-grid'>
            <div className='order-summary-left'>
              <div className='order-summary-total-title'>
                Service Charge (5%)
              </div>
            </div>
            <div className='order-summary-right'>
              <div className='order-summary-total-price'>$3.00</div>
            </div>
          </div>
          <div className='order-summary-grid'>
            <div className='order-summary-left'>
              <div className='order-summary-total-title'>Discount</div>
            </div>
            <div className='order-summary-right'>
              <div className='order-summary-total-price'>$7.00</div>
            </div>
          </div>
          <div className='order-summary-grid'>
            <div className='order-summary-left'>
              <div className='order-summary-total-title accent-color'>
                Net Total
              </div>
            </div>
            <div className='order-summary-right'>
              <div className='order-summary-total-price accent-color'>
                $30.00
              </div>
            </div>
          </div>

          <div className='proceed-to-checkout-button'>
            Proceed to Checkout
            <box-icon name='right-arrow-alt' color='#ffffff'></box-icon>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderScreen;
