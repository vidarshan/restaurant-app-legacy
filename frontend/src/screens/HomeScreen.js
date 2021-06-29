import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import Landing from '../components/Landing';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return <Landing></Landing>;
};

export default HomeScreen;
