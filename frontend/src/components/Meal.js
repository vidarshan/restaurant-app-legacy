import React from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';

const Meal = ({ meal }) => {
  const { _id: id, name, description, price, image, vegan } = meal;

  return (
    <div className='menu__content'>
      <div className='vegan-badge'>
        <box-icon
          name='food-tag'
          color={vegan ? '#048654' : '#e14c38'}></box-icon>
      </div>
      <img src={image} alt='' className='menu-img' />
      <div className='menu__price__large__font'>${price}</div>
      <h3 className='menu__name'>
        {name.length > 16 ? name.slice(0, 18).concat('...') : name}
      </h3>

      <span className='menu__detail'>
        {description.length > 16
          ? description.slice(0, 24).concat('...')
          : description}
      </span>
      <Link className='menu__button' to={`/meal/${id}`}>
        <p className='menu__button__text'>Add to Order</p>
      </Link>
    </div>
  );
};

export default Meal;
