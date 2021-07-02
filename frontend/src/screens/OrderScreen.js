import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import EmptyContainer from '../components/EmptyContainer';

import '../assets/scss/order.scss';

import { map, slice } from 'lodash';

const OrderScreen = ({ match, location, history }) => {
  let discountAmount = 0.05;
  let serviceChargeAmount = 0.03;

  const [grossPrice, setGrossPrice] = useState(0);
  const [items, setItems] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [netPrice, setNetPrice] = useState(0);

  const mealId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const size = '';

  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const { orderItems } = order;

  const removeFromOrderHandler = (id) => {
    dispatch(removeFromOrder(id));
  };

  const calculateFinalPrice = useCallback(() => {
    let calculatedGrossPrice = 0;
    let calculatedDiscountPrice = 0;
    let calculatedServiceCharge = 0;
    let calculatedNetPrice = 0;
    let calculatedItems = orderItems.length;

    map(orderItems, (unitPrice) => {
      calculatedGrossPrice = calculatedGrossPrice + unitPrice.price;
    });

    calculatedDiscountPrice = Math.round(calculatedGrossPrice * discountAmount);
    calculatedServiceCharge = Math.round(
      calculatedGrossPrice * serviceChargeAmount
    );

    calculatedNetPrice = Math.round(
      calculatedGrossPrice + calculatedServiceCharge - calculatedDiscountPrice
    );

    setItems(calculatedItems);
    setGrossPrice(calculatedGrossPrice);
    setDiscount(calculatedDiscountPrice);
    setServiceCharge(calculatedServiceCharge);
    setNetPrice(calculatedNetPrice);
  }, [discountAmount, orderItems, serviceChargeAmount]);

  // const calculateFinalPrice = () => {
  // };

  useEffect(() => {
    if (mealId) {
      dispatch(addToOrder(mealId, qty, size));
    }

    calculateFinalPrice();
  }, [dispatch, mealId, qty, orderItems, calculateFinalPrice]);

  return (
    <>
      {orderItems.length > 0 ? (
        <section className='section bd-container' id='menu'>
          <div className='order'>
            {map(orderItems, (orderItem) => {
              return (
                <div className='order__card'>
                  <div className='order__card--image'>
                    <img src={orderItem.image} alt='' />
                  </div>

                  <div className='order__card--info'>
                    <div className='name-qty-row'>
                      <div className='order__card--title'>
                        {' '}
                        {orderItem.name.length > 16
                          ? orderItem.name.slice(0, 16).concat('...')
                          : orderItem.name}
                      </div>
                      <div className='order__card--quantity'>
                        x{orderItem.qty}
                      </div>
                    </div>
                    <div className='order__card--size'>{orderItem.size}</div>
                    <div className='order__card--addons'>
                      {orderItem.addons.current.length > 3
                        ? map(
                            slice(orderItem.addons.current, 0, 3),
                            (addOn) => {
                              return <div className='addOn'>{addOn}</div>;
                            }
                          )
                        : map(orderItem.addons.current, (addOn) => {
                            return <div className='addOn'>{addOn}</div>;
                          })}
                    </div>
                    <div className='price-remove-row'>
                      <div className='order__card--price'>
                        {orderItem.price}
                      </div>
                      <div
                        className='order__card--remove'
                        onClick={() => removeFromOrderHandler(orderItem.meal)}>
                        <box-icon name='trash-alt'></box-icon>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='summary'>
            <div className='summary--info'>
              Gross Total
              <div>${grossPrice}</div>
            </div>
            <div className='summary--info'>
              <div>Items</div>
              <div>${items}</div>
            </div>
            <div className='summary--info'>
              <div>Service Charge (5%)</div>
              <div>${serviceCharge}</div>{' '}
            </div>
            <div className='summary--info'>
              <div>Discount</div>
              <div>${discount}</div>
            </div>
            <div className='summary--info'>
              <div className='order-summary-total-title accent-color'>
                Net Total
              </div>
              <div className='order-summary-total-price accent-color'>
                ${netPrice}
              </div>
            </div>
            <div className='summary--checkout'>
              <div className='button-primary'>
                Proceed to Checkout
                <box-icon name='right-arrow-alt' color='#ffffff'></box-icon>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className='section bd-container'>
          <EmptyContainer
            message={
              'Nothing here, keep exploring to fill this up.'
            }></EmptyContainer>
        </section>
      )}
    </>
  );
};

export default OrderScreen;
