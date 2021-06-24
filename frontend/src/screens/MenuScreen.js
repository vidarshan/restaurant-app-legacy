import React, { useRef, useState, useEffect } from 'react';
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
  const sample = useRef([]);
  const [filterMeals, setFilterMeals] = useState('All');
  const [showFilters, setShowfilters] = useState(false);
  const [searchString, setSearchString] = useState('');
  const mealList = useSelector((state) => state.mealList);
  const categoryList = useSelector((state) => state.categories);

  let { meals, loading, error } = mealList;

  const { categories } = categoryList;

  const sortMeals = (criteria, filterName) => {
    if (
      filterName.toLowerCase() === 'price' &&
      criteria === 'Lowest to Highest'
    ) {
      dispatch(listMeals('price', 'asc'));
    } else if (
      filterName.toLowerCase() === 'price' &&
      criteria === 'Highest to Lowest'
    ) {
      dispatch(listMeals('price', 'desc'));
    } else if (
      filterName.toLowerCase() === 'popularity' &&
      criteria === 'Most Ordered'
    ) {
      dispatch(listMeals('orders', 'desc'));
    } else if (
      filterName.toLowerCase() === 'popularity' &&
      criteria === 'Latest'
    ) {
      dispatch(listMeals('timestamps', 'desc'));
    } else if (
      filterName.toLowerCase() === 'vegetarian' &&
      criteria === 'Vegetarian'
    ) {
      dispatch(listMeals('vegan', true));
    } else if (
      filterName.toLowerCase() === 'vegetarian' &&
      criteria === 'Non-vegetarian'
    ) {
      dispatch(listMeals('vegan', false));
    }

    console.log(filterName.toLowerCase(), criteria);
  };

  const displayMeals = (sortingOrder, sortingType) => {
    let results = [];
    console.log('order : ' + sortingOrder);
    console.log('type : ' + sortingType);

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

    console.log('ret ' + results);
    return results;
  };

  const searchMeals = (keyword) => {};

  const filters = [
    { name: 'Price', choices: ['Lowest to Highest', 'Highest to Lowest'] },
    { name: 'Vegetarian', choices: ['Vegetarian', 'Non-vegetarian'] },
    { name: 'Popularity', choices: ['Most Ordered', 'Latest'] },
  ];

  useEffect(() => {
    dispatch(listMeals());
    dispatch(listCategories());
  }, []);

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
              {map(categories, (category) => {
                return (
                  <div
                    className='menu-filter-item'
                    onClick={() => setFilterMeals(category.name)}>
                    {category.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className='bd-grid'>
            {map(displayMeals(), (meal) => {
              return <Meal meal={meal}></Meal>;
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default MenuScreen;
