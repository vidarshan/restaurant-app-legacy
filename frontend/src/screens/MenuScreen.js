import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import Meal from '../components/Meal';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MenuScreen = ({ match }) => {
  const dispatch = useDispatch();
  const mealList = useSelector((state) => state.mealList);

  const { meals, loading, error } = mealList;
  console.log(mealList);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return (
    <section className='menu section bd-container' id='menu'>
      <span className='section-subtitle'>Special</span>
      <h2 className='section-title'>Menu of the week</h2>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message message={error} variant='danger'></Message>
      ) : (
        <div className='menu__container bd-grid'>
          {meals.map((meal) => {
            return <Meal meal={meal}></Meal>;
          })}
        </div>
      )}
    </section>
  );
};

export default MenuScreen;
