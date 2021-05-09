import React from 'react';

const Info = ({ mealName, mealDescription }) => {
  return (
    <div className='info-container'>
      <div className='name'>{mealName}</div>
      <div className='description'>{mealDescription}</div>
    </div>
  );
};

export default Info;
