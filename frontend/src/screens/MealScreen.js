import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mealItem } from '../actions/mealActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { map } from '../lodash';

const MealScreen = ({ history, match }) => {
  let addOnContainer = useRef([]);
  const [size, setSize] = useState();
  const [sizePrice, setSizePrice] = useState(0);
  const [enableAddOns, setEnableAddOns] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [configuredPrice, setConfiguredPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();
  const item = useSelector((state) => state.mealItem);

  const { loading, error, meal } = item;

  const setQuantityAndQuantityPrice = (type) => {
    let tempQuantity;
    let tempTotalPrice;

    if (type === 'i' && quantity <= 9) {
      tempQuantity = quantity + 1;
      tempTotalPrice = totalPrice + configuredPrice;
      setQuantity(tempQuantity);
      setTotalPrice(tempTotalPrice);
    } else if (type === 'd' && quantity > 1) {
      tempQuantity = quantity - 1;
      tempTotalPrice = totalPrice - configuredPrice;
      setQuantity(tempQuantity);
      setTotalPrice(tempTotalPrice);
    }
  };

  // const setSizeAndSizePrice = (e, price) => {
  //   let temp;
  //   let total;
  //   setSizePrice(price);

  //   if (sizePrice === price) {
  //     setSize(e);
  //     setSizePrice(price);
  //   } else if (sizePrice > price) {
  //     temp = sizePrice - price;
  //     total = totalPrice - temp;
  //     setSize(e);
  //     setTotalPrice(total);
  //   } else if (sizePrice < price) {
  //     temp = price - sizePrice;
  //     total = totalPrice + temp;
  //     setSize(e);
  //     setTotalPrice(total);
  //     setConfiguredPrice(total);
  //   }
  //   setEnableAddOns(false);
  // };

  function selectAddOn(addOnName, addOnPrice) {
    let temp = totalPrice;
    var updatedAddOns = [];
    if (!addOnContainer.current.includes(addOnName)) {
      addOnContainer.current.push(addOnName);
      temp = totalPrice + addOnPrice;
      setTotalPrice(temp);
      setConfiguredPrice(temp);
    } else {
      updatedAddOns = addOnContainer.current.filter(function (
        value,
        index,
        arr
      ) {
        return value !== addOnName;
      });

      addOnContainer.current.length = 0;
      addOnContainer = Array.from(updatedAddOns);

      temp = totalPrice - addOnPrice;
      setTotalPrice(temp);
      setConfiguredPrice(temp);
    }
  }

  useEffect(() => {
    dispatch(mealItem(match.params.id));
  }, [dispatch, match]);

  const addToOrderHandler = () => {
    history.push(`/order/${match.params.id}?qty=${quantity}&size=${size}`);
  };

  return (
    <section className='section bd-container' id='menu'>
      <div class='inner'>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message message={error} variant='danger'></Message>
        ) : (
          <div class='flex-container'>
            <div class='flex-item-left'>
              <img src={meal.image} alt='' />
            </div>
            <div class='flex-item-right'>
              <div className='info-container'>
                <div className='name'>{meal.name}</div>
                <div className='description'>{meal.description}</div>
              </div>
              <div className='action-labels'>Select Add-ons</div>
              <div className='size-container-meal'>
                {meal.sizes !== undefined
                  ? map(meal.sizes, (e) => {
                      return (
                        <div className='size-container-meal-item'>
                          <div class='pretty p-icon p-round'>
                            <input type='radio' name='icon_solid' />
                            <div class='state p-primary'>
                              <i class='icon mdi mdi-check'></i>
                              <label>
                                {e.size} | {e.price}
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : console.log('wft')}
              </div>

              <div className='seperator'></div>
              <div className='action-labels'>Select Add-ons</div>
              <div class='flex-container-addon'>
                {meal.addons !== undefined ? (
                  map(meal.addons, (e) => {
                    return (
                      <div className='flex-left-addon'>
                        <div class='pretty p-default p-fill'>
                          <input type='checkbox' />
                          <div class='state'>
                            <label>
                              {e.addOnName} | {e.addOnPrice}
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className='notes-textarea-container'>
                <textarea
                  id='w3review'
                  name='w3review'
                  rows='4'
                  cols='50'
                  placeholder='Add notes here'></textarea>
              </div>

              <div className='quantity-add-to-order-container'>
                <div className='quantity-holder-flex-item'>
                  <div className='quantity-container'>
                    <div className='quantity-minus'>-</div>
                    <div className='quantity-text'>1</div>
                    <div className='quantity-add'>+</div>
                  </div>
                </div>
                <div className='add-to-cart-btn-flex-item'>
                  <div className='add-to-cart-btn-flex-item'>
                    <div className='add-to-order-button'>Add to Cart</div>
                  </div>
                </div>
              </div>

              {/* {sizePrice > 0 ? (
                <div className='notes-container'>
                  <textarea
                    placeholder='Additional Notes...'
                    cols='30'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows='5'></textarea>
                </div>
              ) : (
                <>Select size to add notes</>
              )} */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealScreen;
