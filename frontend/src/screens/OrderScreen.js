import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder, removeFromOrder } from '../actions/orderActions';
import EmptyContainer from '../components/EmptyContainer';
import Emoji from '../components/Emoji';
import { map } from 'lodash';

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

  const calculateFinalPrice = () => {
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
  };

  useEffect(() => {
    if (mealId) {
      dispatch(addToOrder(mealId, qty, size));
    }

    calculateFinalPrice();
  }, [dispatch, mealId, qty, orderItems]);

  return (
    <>
      {orderItems.length > 0 ? (
        <section
          className='section bd-container-order'
          style={{ backgroundColor: 'lightcoral' }}
          id='menu'>
          {' '}
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
                        <div className='order-total-price'>
                          {o.qty * o.price}
                        </div>
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
                  <div className='order-summary-total-price'>{grossPrice}</div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>Items</div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>{items}</div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>
                    Service Charge (5%)
                  </div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>
                    {serviceCharge}
                  </div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>Discount</div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>{discount}</div>
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
                    {netPrice}
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
      ) : (
        <section className='section bd-container'>
          <EmptyContainer
            message={
              'Nothing here, keep exploring to fill this up.'
            }></EmptyContainer>
        </section>
      )}

      {/* <section
      className='section bd-container-order'
      style={{ backgroundColor: 'lightcoral' }}
      id='menu'></section>
     
        
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
                        <div className='order-total-price'>
                          {o.qty * o.price}
                        </div>
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
                  <div className='order-summary-total-price'>{grossPrice}</div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>Items</div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>{items}</div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>
                    Service Charge (5%)
                  </div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>
                    {serviceCharge}
                  </div>
                </div>
              </div>
              <div className='order-summary-grid'>
                <div className='order-summary-left'>
                  <div className='order-summary-total-title'>Discount</div>
                </div>
                <div className='order-summary-right'>
                  <div className='order-summary-total-price'>{discount}</div>
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
                    {netPrice}
                  </div>
                </div>
              </div>

              <div className='proceed-to-checkout-button'>
                Proceed to Checkout
                <box-icon name='right-arrow-alt' color='#ffffff'></box-icon>
              </div>
            </div>
          </div>
        </>
     
    </section> */}
    </>
  );
};

export default OrderScreen;
