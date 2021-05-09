import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import 'boxicons';

const Meal = ({ meal }) => {
  return (
    <div className='menu__content'>
      <div className='badge'>{meal.price}</div>
      <img src={meal.image} alt='' className='meal__img' />
      <h3 className='menu__name'>{meal.name}</h3>
      <span className='menu__detail'>{meal.description}</span>

      <span className='menu__ratingAndReview__container'>
        <Rating value={meal.rating}></Rating>
        <span className='menu__numReviews'> {meal.numReviews}</span>
      </span>

      <Link className='menu__button' to={`/meal/${meal._id}`}>
        <p className='menu__button__text'>Add to Order</p>
      </Link>
    </div>
  );
};

export default Meal;
