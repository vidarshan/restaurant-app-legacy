import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mealRecommendation } from '../actions/mealActions';
import { map, take } from '../lodash';

import '../assets/scss/recommendations.scss';

const Recommendations = ({ heading, emoji, items, orientation }) => {
  const dispatch = useDispatch();

  const { meals, loading, error } = useSelector(
    (state) => state.mealRecommendation
  );

  useEffect(() => {
    dispatch(mealRecommendation());
  }, [dispatch]);

  return (
    <div className='recommendations-container'>
      <div className='recommendations-heading'>
        {heading} {emoji}
      </div>
      <div className='recommendations-items'>
        {map(meals, (meal) => {
          return (
            <>
              <div
                className={
                  orientation === 'vertical' ? 'card full-width' : 'card'
                }>
                <div className='card-details'>
                  <div className='card-title'>
                    {' '}
                    {meal.name > 10
                      ? meal.name.slice(0, 18).concat('...')
                      : meal.name}
                  </div>
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
