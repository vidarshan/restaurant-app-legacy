import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import { listCategories } from '../actions/categoryActions';

import '../assets/scss/menu.scss';
import Meal from '../components/Meal';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { map, filter, orderBy } from '../lodash';

const MenuScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [filterMeals, setFilterMeals] = useState('All');
  const [searchString, setSearchString] = useState('');
  const mealList = useSelector((state) => state.mealList);
  const categoryList = useSelector((state) => state.categories);

  let { meals, loading, error } = mealList;

  const { categories } = categoryList;

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
    dispatch(listMeals());
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

          <div className='category-filter-row'>
            <div className='menu-filter'>
              {map(categories, (category, key) => {
                return (
                  <div
                    key={key}
                    className='menu-filter-item'
                    onClick={() => setFilterMeals(category.name)}>
                    {category.name}
                  </div>
                );
              })}
            </div>
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
