import React from 'react';
import PropTypes from 'prop-types';
import 'boxicons';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <box-icon
          name={value >= 1 ? 'star' : value >= 0.5 ? 'star-half' : 'star'}
          color={color}
          type='solid'></box-icon>
      </span>
      <span>
        <box-icon
          name={value >= 2 ? 'star' : value >= 1.5 ? 'star-half' : 'star'}
          color={color}
          type='solid'></box-icon>
      </span>
      <span>
        <box-icon
          name={value >= 3 ? 'star' : value >= 2.5 ? 'star-half' : 'star'}
          color={color}
          type='solid'></box-icon>
      </span>
      <span>
        <box-icon
          name={value >= 4 ? 'star' : value >= 3.5 ? 'star-half' : 'star'}
          color={color}
          type='solid'></box-icon>
      </span>
      <span>
        <box-icon
          name={value >= 5 ? 'star' : value >= 4.5 ? 'star-half' : 'star'}
          color={color}
          type='solid'></box-icon>
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f5bc42',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
