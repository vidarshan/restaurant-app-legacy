import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mealItem } from '../actions/mealActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

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
              <div>
                <label className='size-label'>
                  <input type='radio' name='editList' value='always' />x 4 |
                  Small
                </label>
                <label className='size-label'>
                  <input type='radio' name='editList' value='never' />x 6 |
                  Medium
                </label>
                <label className='size-label'>
                  <input type='radio' name='editList' value='costChange' />x 8 |
                  Large
                </label>
              </div>
              <div>
                <div className='quantity-label'></div>
                <div className='quantity-container'>
                  <div className='decrease-quantity'>-</div>
                  <div className='quantity'>3</div>
                  <div className='increase-quantity'>+</div>
                </div>
              </div>
              {sizePrice > 0 ? (
                <div className='addon-container'>
                  <div className='add-on-row'>
                    {meal.addons !== undefined ? (
                      meal.addons.map((addon) => (
                        <div className='add-on-column'>
                          <div class='pretty p-default font-small'>
                            <input
                              type='checkbox'
                              value={addon.addOnName}
                              onChange={(e) =>
                                selectAddOn(e.target.value, addon.addOnPrice)
                              }
                              disabled={enableAddOns}
                            />
                            <div class='state p-success'>
                              <label>
                                {addon.addOnName} | {addon.addOnPrice}
                              </label>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Message message='An error occured. Please retry'></Message>
                    )}
                  </div>
                </div>
              ) : (
                <>Select size to add extras</>
              )}
              {sizePrice > 0 ? (
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
              )}
              {sizePrice > 0 ? (
                <div className='add-to-cart-quantity-container'>
                  <div className='quantity-container'>
                    <div class='num-block skin-2'>
                      <div class='num-in'>
                        <span
                          class='minus dis'
                          onClick={() =>
                            setQuantityAndQuantityPrice('d')
                          }></span>
                        <input
                          type='text'
                          class='in-num default-font'
                          value={quantity}
                          readonly=''
                        />
                        <span
                          class='plus'
                          onClick={() =>
                            setQuantityAndQuantityPrice('i')
                          }></span>
                      </div>
                    </div>
                  </div>
                  <div className='btn-container'>
                    <Link
                      onClick={addToOrderHandler}
                      className='add__to__order__button '>
                      Add to Order |{totalPrice}
                    </Link>
                  </div>
                </div>
              ) : (
                <>Select Size to select quantity</>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealScreen;
