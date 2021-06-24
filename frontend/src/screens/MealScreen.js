import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mealItem } from '../actions/mealActions';
import { addToOrder } from '../actions/orderActions';

import '../assets/scss/meals.scss';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Recommendations from '../components/Recommendations';
import { map } from '../lodash';

const MealScreen = ({ match }) => {
  let addOnContainer = useRef([]);

  //eslint-disable-next-line
  const [size, setSize] = useState();
  const [sizePrice, setSizePrice] = useState(0);

  const [totalAddOnPrices, setTotalAddOnPrices] = useState(0);

  const [enableOptions, setEnableOptions] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();
  const item = useSelector((state) => state.mealItem);

  const { loading, error, meal } = item;

  const handleSizePriceToTotalPrice = (selectedSize, selectedSizePrice) => {
    if (sizePrice === 0) {
      setSize(selectedSize);
      setSizePrice(selectedSizePrice);
      setTotalPrice(totalPrice + selectedSizePrice);
    } else {
      if (selectedSizePrice > sizePrice) {
        let temp = selectedSizePrice - sizePrice;
        temp = temp * quantity;
        setTotalPrice(totalPrice + temp);
      } else if (sizePrice > selectedSizePrice) {
        let temp = sizePrice - selectedSizePrice;
        temp = temp * quantity;
        setTotalPrice(totalPrice - temp);
      }
    }
    setSize(selectedSize);
    setSizePrice(selectedSizePrice);

    setEnableOptions(false);
  };

  const handleQuantityPriceToTotalPrice = (increaseOrDecrease) => {
    let tempQuantity;

    if (increaseOrDecrease === 'i' && quantity <= 9) {
      tempQuantity = quantity + 1;
      setQuantity(tempQuantity);
      setTotalPrice(totalPrice + (totalAddOnPrices + sizePrice));
    } else if (increaseOrDecrease === 'd' && quantity > 1) {
      tempQuantity = quantity - 1;

      setQuantity(tempQuantity);
      setTotalPrice(totalPrice - (totalAddOnPrices + sizePrice));
    }
  };

  const handleAddOnPriceToTotalPrice = (addOnName, addOnPrice) => {
    if (!addOnContainer.current.includes(addOnName)) {
      addOnContainer.current.push(addOnName);
      let addOnPriceTotal = addOnPrice * quantity;
      setTotalPrice(totalPrice + addOnPriceTotal);
      setTotalAddOnPrices(totalAddOnPrices + addOnPrice);
    } else {
      let addOnsAfterRemove = addOnContainer.current.filter(
        (e) => e !== addOnName
      );
      addOnContainer.current = [];
      addOnContainer.current = Array.from(addOnsAfterRemove);

      let addOnPriceTotal = addOnPrice * quantity;
      setTotalPrice(totalPrice - addOnPriceTotal);
      setTotalAddOnPrices(totalAddOnPrices - addOnPrice);
    }
  };

  useEffect(() => {
    dispatch(mealItem(match.params.id));

    var acc = document.getElementsByClassName('accordion');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }

    /*******************************
     * *****************************
     * *****************************
     * *****************************
     * *****************************
     * refresh page is the potential solution.
     * better if refresh and go to /order
     */
  }, [dispatch, match]);

  const addToOrderHandler = () => {
    if (meal._id) {
      dispatch(addToOrder(meal._id, quantity, size, addOnContainer, notes));
      // dispatch({ type: ORDER_COUNT_ITEMS });
    }
  };

  return (
    <section className='section bd-container-meal' id='menu'>
      <div className='meal-configurator'>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message message={error} variant='danger'></Message>
        ) : (
          <div class='flex-container'>
            <div class='flex-item-left'>
              <img className='meal-image' src={meal.image} alt='' />
              <div className='name'>{meal.name}</div>
              <div className='description'>{meal.description}</div>
            </div>
            <div class='flex-item-right'>
              <div className='info-container'></div>
              <div className='action-labels'>Select Size</div>
              <div className='size-container'>
                {meal.sizes !== undefined ? (
                  map(meal.sizes, (e) => {
                    return (
                      <div className='size-info-container'>
                        <div className='size-radio-btn'>
                          <input
                            type='radio'
                            name='radio'
                            className='size-radio'
                            value={e.price}
                            onClick={() =>
                              handleSizePriceToTotalPrice(e.size, e.price)
                            }
                          />
                        </div>
                        <div className='size-name'>{e.size}</div>
                        <div className='size-total-price'>
                          ${e.price * quantity}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className='action-labels'>Select Add-ons</div>
              <div class='addon-container'>
                {meal.addons !== undefined ? (
                  map(meal.addons, (e) => {
                    return (
                      <div className='addon-info-container'>
                        <div className='addon-radio-btn'>
                          <input
                            type='checkbox'
                            value={e.price}
                            value={e.addOnPrice}
                            disabled={enableOptions}
                            onClick={() =>
                              handleAddOnPriceToTotalPrice(
                                e.addOnName,
                                e.addOnPrice
                              )
                            }
                          />
                        </div>
                        <div className='addon-name'> {e.addOnName}</div>
                        <div className='addon-total-price'>
                          ${e.addOnPrice * quantity}
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
                  name='notes'
                  rows='2'
                  cols='50'
                  placeholder='Add notes here'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={enableOptions}></textarea>
              </div>

              <div className='quantity-add-to-order-button-container'>
                <div className='quantity-container'>
                  <input
                    className='quantity-minus'
                    type='button'
                    value='-'
                    onClick={(e) => handleQuantityPriceToTotalPrice('d')}
                  />
                  <div className='quantity-text'>{quantity}</div>
                  <input
                    className='quantity-add'
                    type='button'
                    value='+'
                    onClick={(e) => handleQuantityPriceToTotalPrice('i')}
                  />
                </div>
                <div className='order-btn' onClick={addToOrderHandler}>
                  <div className='text-price-container'>
                    Add to Order
                    {/* <br></br>
                    {totalPrice} */}
                  </div>
                  <div className='total-price-order'>${totalPrice}</div>
                  <div className='arrow-container'>
                    <box-icon name='right-arrow-alt' color='#707070'></box-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{' '}
      </div>
      <div className='meal-suggestions'>
        {' '}
        <Recommendations
          heading='This weeks hottest'
          emoji={'🔥'}
          orientation='horizontal'
          items={4}></Recommendations>
      </div>
    </section>
  );
};

export default MealScreen;
