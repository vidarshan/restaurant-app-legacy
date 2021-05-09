import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='home__container bd-container bd-grid'>
      <div className='home__data'>
        <h1 className='home__title'>Tasty food</h1>
        <h2 className='home__subtitle'>Try the best food of the week.</h2>
        <Link to='/menu' className='button'>
          View Menu
        </Link>
      </div>

      <img src='/images/home.png' className='home__img' alt=''></img>
    </div>
  );
};

export default Landing;
