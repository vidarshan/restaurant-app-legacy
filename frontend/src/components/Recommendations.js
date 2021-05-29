import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import { Link } from 'react-router-dom';
import { map, take } from '../lodash';

import '../assets/scss/recommendations.scss';

import Meal from '../components/Meal';
import Rating from './Rating';

const Recommendations = ({ heading, emoji, items }) => {
  const dispatch = useDispatch();
  let mealsList = useSelector((state) => state.mealList);

  const { meals, loading, error } = mealsList;

  let s = take(meals, items);

  useEffect(() => {
    dispatch(listMeals());
  }, []);

  return (
    <div className='recommendations-container'>
      <div className='recommendations-heading'>
        {heading} {emoji}
      </div>
      <div className='recommendations-items'>
        {map(s, (meal) => {
          return (
            <>
              <div className='card'>
                <div className='card-details'>
                  <div className='card-title'>{meal.name}</div>
                  <div className='card-starting-price-label'>Starting from</div>
                  <div className='starting-price'>${meal.price}</div>
                  <div className='card-reason'>Most Ordered this week</div>
                </div>
                <div className='card-image'>
                  <img src={meal.image} alt='' />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
