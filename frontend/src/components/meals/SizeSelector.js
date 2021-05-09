import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const SizeSelector = () => {
  return (
    <div>
      <div className='select-size-label'>Select Size</div>
      <div className='size-container'>
        <div className='size-item'>
          <FontAwesomeIcon icon={faPizzaSlice} />
          <div className='size-description'>Personal</div>
          <p className='size-price'>510</p>
        </div>
        <div className='size-item'>
          <FontAwesomeIcon icon={faPizzaSlice} />
          <div className='size-description'>Medium</div>
          <p className='size-price'>970</p>
        </div>
        <div className='size-item'>
          <FontAwesomeIcon icon={faPizzaSlice} />
          <div className='size-description'>Large</div>
          <p className='size-price'>1510</p>
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
