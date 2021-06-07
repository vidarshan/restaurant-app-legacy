import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import 'boxicons';

const Meal = ({ meal }) => {
  return (
    <div className='menu__content'>
      <div className='vegan-badge'>
        <box-icon
          name='food-tag'
          color={meal.vegan ? '#048654' : '#e14c38'}></box-icon>
      </div>
      <img src={meal.image} alt='' className='menu-img' />
      <h3 className='menu__name'>{meal.name}</h3>
      <span className='menu__detail'>{meal.description}</span>

      <div className='menu__price'>
        Starting from
        <div className='menu__price__large__font'>${meal.price}</div>
      </div>

      <Link className='menu__button' to={`/meal/${meal._id}`}>
        <p className='menu__button__text'>Add to Order</p>
      </Link>
    </div>
  );
};

export default Meal;
