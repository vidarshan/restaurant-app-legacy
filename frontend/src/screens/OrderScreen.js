import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';

const OrderScreen = ({ match, location, history }) => {
  var randomColor = require('randomcolor');
  var color = randomColor({
    count: 8,
    hue: 'green',
  });

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
    <section className='section bd-container-order' id='menu'>
      <div class='box box1'>
        <div className='order-item-grid'>
          <div className='order-item-category'>
            Pizza <Emoji symbol='🍕' />
          </div>
          <div className='order-item'>
            <div className='order-item-image'>
              <img width='70' height='70' src='./images/pizza4.jpg' alt=' ' />
            </div>
            <div className='title-description-addons-container'>
              <div className='order-item-title'>Philly Cheese Steak</div>
              <div className='order-item-description'>
                best Pizza that tastes like no other
              </div>
              <div className='order-item-addOns'>
                <div className='addOn'>Jalapeno</div>
                <div className='addOn'>Pineapple</div>
                <div className='addOn'>Cheese</div>
              </div>
            </div>
            <div className='order-item-unit-quantity'>
              <div className='order-quantity'>2 nos</div>
            </div>
            <div className='total-price-unit-quantity-container'>
              <div className='order-total-price'>$100.99</div>
            </div>
            <div className='order-item-remove'>
              <div className='order-remove-btn-container'>
                <box-icon size='20px' name='trash' color='#ffffff'></box-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='box box2'>Box 2</div>
      {/* <div className='flex-order-container'>
        {orderItems.map((o) => {
          return (
            <div className='order-item-container'>
              <div className='order-details'>
                <div className='order-item-title'>{o.name}</div>
                <div className='order-item-unit-price-quanity'>
                  {o.price} x {o.qty}
                </div>
                <div className='order-item-total-price'>{o.price * o.qty}</div>
              </div>
              <div className='order-item-image'>
                <img width='100' height='100' src={o.image} alt=' ' />
              </div>
              <div className='order-item-remove-button-container'>
                <Link
                  className='remove-from-order-button'
                  onClick={() => removeFromOrderHandler(o.meal)}>
                  <box-icon size='20px' name='trash' color='#ffffff'></box-icon>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className='order-summary-container'>
        <div className='order-summary-left'>
          <div className='order-summary-total'>Total 300.00</div>
          <div className='order-summary-items'>3 Items</div>
        </div>

        <div className='order-summary-right'>
          <div className='proceed-to-checkout-button'>
            Proceed to Checkout
            <box-icon name='right-arrow-alt' color='#ffffff'></box-icon>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default OrderScreen;
