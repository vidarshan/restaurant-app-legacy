import React from 'react';

const QuantitySelector = () => {
  return (
    <div>
      <div className='quantity-label'>Select Quantity</div>
      <div className='quantity-container'>
        <div className='decrease-quantity'>-</div>
        <div className='quantity'>3</div>
        <div className='increase-quantity'>+</div>
      </div>
    </div>
  );
};

export default QuantitySelector;
