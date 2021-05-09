import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import Landing from '../components/Landing';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const mealList = useSelector((state) => state.mealList);
  // const { loading, error, meals } = mealList;
  console.log(mealList);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return <Landing></Landing>;
};

export default HomeScreen;
