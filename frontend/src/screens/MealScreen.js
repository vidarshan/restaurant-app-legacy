import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { mealItem } from '../actions/mealActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { map, remove } from '../lodash';

const MealScreen = ({ history, match }) => {
  let addOnContainer = useRef([]);
  let tempAddOnContainer = useRef([]);
  const [size, setSize] = useState();
  const [sizePrice, setSizePrice] = useState(0);
  const [enableOptions, setEnableOptions] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [configuredPrice, setConfiguredPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();
  const item = useSelector((state) => state.mealItem);

  const { loading, error, meal } = item;

  const handleSizePriceToTotalPrice = (selectedSize, selectedSizePrice) => {
    let temp;

    if (sizePrice == 0) {
      setTotalPrice(selectedSizePrice);
      setConfiguredPrice(selectedSizePrice);
      setSize(selectedSize);
      setSizePrice(selectedSizePrice);
    } else {
      if (selectedSize > size) {
        temp = selectedSizePrice - sizePrice;
        setTotalPrice(totalPrice + temp);
        setConfiguredPrice(totalPrice + temp);
      } else if (selectedSize < size) {
        temp = sizePrice - selectedSizePrice;
        setTotalPrice(totalPrice - temp);
        setConfiguredPrice(totalPrice - temp);
      } else if (selectedSize === size) {
      }
    }

    setSize(selectedSize);
    setSizePrice(selectedSizePrice);
    setEnableOptions(false);
  };

  const handleQuantityPriceToTotalPrice = (increaseOrDecrease) => {
    let tempQuantity;
    let tempTotalPrice;

    if (increaseOrDecrease === 'i' && quantity <= 9) {
      tempQuantity = quantity + 1;
      tempTotalPrice = totalPrice + configuredPrice;
      setQuantity(tempQuantity);
      setTotalPrice(tempTotalPrice);
    } else if (increaseOrDecrease === 'd' && quantity > 1) {
      tempQuantity = quantity - 1;
      tempTotalPrice = totalPrice - configuredPrice;
      setQuantity(tempQuantity);
      setTotalPrice(tempTotalPrice);
    }
  };

  const handleAddOnPriceToTotalPrice = (addOnName, addOnPrice) => {
    let temp = totalPrice;

    if (!addOnContainer.current.includes(addOnName)) {
      addOnContainer.current.push(addOnName);
      setTotalPrice(totalPrice + addOnPrice);
      setConfiguredPrice(totalPrice + addOnPrice);
    } else {
      let sample = addOnContainer.current.filter((e) => e !== addOnName);

      addOnContainer.current = [];

      addOnContainer.current = Array.from(sample);
      setTotalPrice(totalPrice - addOnPrice);
      setConfiguredPrice(totalPrice - addOnPrice);
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
              <div className='action-labels'>Select Add-ons</div>
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
                              {e.size} | {e.price}
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

              <div className='seperator'></div>
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
                  placeholder='Add notes here'
                  disabled={enableOptions}></textarea>
              </div>

              <div className='quantity-add-to-order-container'>
                <div className='quantity-holder-flex-item'>
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
                </div>
                <div className='add-to-cart-btn-flex-item'>
                  <div className='add-to-cart-btn-flex-item'>
                    <input
                      type='button'
                      value={`Add to Order | ${totalPrice} | ${configuredPrice}`}
                      className='add-to-order-button'
                      disabled={enableOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealScreen;
