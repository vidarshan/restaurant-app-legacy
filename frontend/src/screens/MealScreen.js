import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { mealItem } from '../actions/mealActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { map, remove } from '../lodash';

const MealScreen = ({ history, match }) => {
  let addOnContainer = useRef([]);

  const [size, setSize] = useState();
  const [sizePrice, setSizePrice] = useState(0);

  const [totalAddOnPrices, setTotalAddOnPrices] = useState(0);

  const [enableOptions, setEnableOptions] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [configuredPrice, setConfiguredPrice] = useState(0);
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

              <div className='action-labels'>Select Size</div>
              <div className='size-container-meal'>
                {meal.sizes !== undefined ? (
                  map(meal.sizes, (e) => {
                    return (
                      <div className='size-container-meal-item'>
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
                            // disabled={enableOptions}
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
                <input
                  type='button'
                  value={`Add to Order | ${totalPrice} | ${quantity}`}
                  className='add-to-order-button'
                />
              </div>
              {/* <div className='quantity-add-to-order-container'>
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

                <div className='add-to-cart-btn-flex-item'>
                  <input
                    type='button'
                    value={`Add to Order | ${totalPrice}`}
                    className='add-to-order-button'
                    disabled={enableOptions}
                  />
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealScreen;
