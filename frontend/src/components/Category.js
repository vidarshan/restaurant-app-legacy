import React from 'react';
import '../assets/scss/categories.scss';

const Category = ({ category }) => {
  return (
    <div className='category-card'>
      <div className='category-name'>{category.name}</div>
      <div className='category-image'>
        <img src={category.image} alt='' srcset='' />
      </div>
    </div>
  );
};

export default Category;
