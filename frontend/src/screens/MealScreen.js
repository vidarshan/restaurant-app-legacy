import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Animated } from 'react-animated-css';
import { mealItem } from '../actions/mealActions';
import { addToOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { map } from '../lodash';
// import { ORDER_COUNT_ITEMS } from '../constants/orderConstants';

const MealScreen = ({ history, match }) => {
  let addOnContainer = useRef([]);

  //eslint-disable-next-line
  const [size, setSize] = useState();
  const [sizePrice, setSizePrice] = useState(0);

  const [totalAddOnPrices, setTotalAddOnPrices] = useState(0);

  const [enableOptions, setEnableOptions] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

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

    setShowAnimation(true);
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
    <section className='section bd-container' id='menu'>
      <Animated
        animationIn='bounceInLeft'
        animationOut='fadeOut'
        isVisible={true}>
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

                <div className='action-labels'>Select Size</div>
                <div className='size-container-meal'>
                  {meal.sizes !== undefined ? (
                    map(meal.sizes, (e) => {
                      return (
                        <div
                          key={meal._id}
                          className='size-container-meal-item'>
                          <div
                            class='pretty p-icon p-round'
                            onClick={() =>
                              handleSizePriceToTotalPrice(e.size, e.price)
                            }>
                            <input
                              type='radio'
                              name='icon_solid'
                              value={e.price}
                            />
                            <div class='state p-primary'>
                              <i class='icon mdi mdi-check'></i>
                              <label>
                                {e.size} | {e.price * quantity}
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

                <div className='action-labels'>Select Add-ons</div>
                <div class='flex-container-addon'>
                  {meal.addons !== undefined ? (
                    map(meal.addons, (e) => {
                      return (
                        <div className='flex-left-addon'>
                          <div
                            class='pretty p-default p-fill'
                            onClick={() =>
                              handleAddOnPriceToTotalPrice(
                                e.addOnName,
                                e.addOnPrice
                              )
                            }>
                            <input
                              type='checkbox'
                              value={e.addOnPrice}
                              disabled={enableOptions}
                            />
                            <div class='state'>
                              <label>
                                {e.addOnName} | {e.addOnPrice * quantity}
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
                    name='notes'
                    rows='4'
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
                      disabled={enableOptions}
                    />
                    <div className='quantity-text'>{quantity}</div>
                    <input
                      className='quantity-add'
                      type='button'
                      value='+'
                      onClick={(e) => handleQuantityPriceToTotalPrice('i')}
                      disabled={enableOptions}
                    />
                  </div>
                  <button
                    className='add-to-order-button'
                    //disabled={enableOptions}
                    onClick={addToOrderHandler}>
                    Add to Order
                    <Animated
                      animationIn='fadeInLeft'
                      animationInDuration={500}
                      animationOutDuration={100}
                      isVisible={showAnimation}>
                      {' '}
                      | {totalPrice}
                    </Animated>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Animated>
    </section>
  );
};

export default MealScreen;
