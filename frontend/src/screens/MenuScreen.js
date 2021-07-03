import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import { listCategories } from '../actions/categoryActions';

import '../assets/scss/menu.scss';
import Meal from '../components/Meal';
import Category from '../components/Category';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { map, filter, orderBy } from '../lodash';

const MenuScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [filterMeals, setFilterMeals] = useState('All');
  const [searchString, setSearchString] = useState('');
  const mealList = useSelector((state) => state.mealList);
  const categoryList = useSelector((state) => state.categories);

  let { meals, loading, error } = mealList;

  const { categories } = categoryList;

  const checkParams = () => {
    var str = history.location.pathname,
      delimiter = '/',
      start = 2,
      tokens = str.split(delimiter).slice(start),
      result = tokens.join(delimiter);

    return result;
  };

  const redirectToCategories = (name) => {
    history.push(`/menu/${name}`);
    dispatch(listMeals(name));
  };

  const displayMeals = (sortingOrder, sortingType) => {
    let results = [];

    if (searchString.length > 0) {
      // setFilterMeals('All');: convert to a useref()

      map(meals, (s) => {
        let target = s.name;
        if (target.includes(searchString)) {
          results.push(s);
        }
      });
    } else {
      results = meals;
    }

    if (filterMeals !== 'All') {
      results = filter(meals, { foodType: filterMeals });
    }

    if (sortingType || sortingOrder !== undefined) {
      if (sortingType.toLowerCase() === 'price') {
        if (sortingOrder === 'Lowest to Highest') {
          results = orderBy(meals, ['price'], ['asc']);
        } else {
          results = orderBy(meals, ['price'], ['desc']);
        }
      }
    }

    return results;
  };

  useEffect(() => {
    if (checkParams().length > 1) {
      dispatch(listMeals(checkParams()));
    } else {
      dispatch(listMeals());
    }

    dispatch(listCategories());
  }, [dispatch]);

  return (
    <section className='section bd-container' id='menu'>
      <h2 className='section-title'>What are you craving?</h2>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message message={error} variant='danger'></Message>
      ) : (
        <>
          <div className='show-filters-accordian'>
            <input
              onChange={(e) => setSearchString(e.target.value)}
              type='text'
              name='email'
              placeholder='Search for what you are craving...'
              className='search-meals-input'
            />
          </div>
          <div className='category__container bd-grid'>
            {map(categories, (category, key) => {
              return (
                <div onClick={() => redirectToCategories(category.name)}>
                  <Category key={key} category={category}></Category>
                </div>
              );
            })}
          </div>

          <div className='bd-grid'>
            {map(displayMeals(), (meal, key) => {
              return <Meal key={key} meal={meal}></Meal>;
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default MenuScreen;
