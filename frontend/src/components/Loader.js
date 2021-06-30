import React from 'react';

const Loader = ({ size }) => {
  return (
    <div className={`loading__container__${size}`}>
      <svg
        className='spinner'
        width={size === 'small' ? '30px' : '30px'}
        height={size === 'small' ? '30px' : '30px'}
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'>
        <circle
          className='path'
          fill='none'
          strokeWidth={size === 'small' ? '3' : '6'}
          strokeLinecap='round'
          cx='33'
          cy='33'
          r='30'></circle>
      </svg>
    </div>
  );
};

Loader.defaultProps = {
  size: 'full',
};

export default Loader;
