import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMeals } from '../../actions/mealActions';
import { map } from '../../lodash';

import '../../assets/scss/admin/mealForm.scss';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const AdminMenuScreen = () => {
  const dispatch = useDispatch();
  const mealList = useSelector((state) => state.mealList);

  const { meals, loading, error } = mealList;

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return (
    <section className='section bd-container-meals' id='menu'>
      <Link to='/admin/meal/new'>Add New Meal</Link>

      {error ? (
        <Message size='full' message={error}></Message>
      ) : loading ? (
        <Loader></Loader>
      ) : (
        <table>
          <tr>
            <th>Meal Name</th>
            <th>Meal Type</th>
            <th>Meal Image</th>
            <th>Meal Addons</th>
            <th>Meal Sizes</th>
            <th>Meal Price</th>
            <th></th>
            <th></th>
          </tr>
          {map(meals, (meal) => {
            return (
              <tr>
                <td>
                  {meal.name.length > 16
                    ? meal.name.slice(0, 18).concat('...')
                    : meal.name}
                </td>
                <td>{meal.foodType}</td>
                <td>
                  <img src={meal.image} alt='' />
                </td>
                <td>
                  {map(meal.addons, (addon) => {
                    return <li>{addon.addOnName}</li>;
                  })}
                </td>
                <td>
                  {map(meal.sizes, (size) => {
                    return <li>{size.size}</li>;
                  })}
                </td>
                <td>{meal.price}</td>
                <td>
                  <div className='action-icon-edit'>
                    <box-icon name='edit'></box-icon>
                  </div>
                </td>
                <td>
                  <div className='action-icon-delete'>
                    <box-icon name='trash-alt'></box-icon>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </section>
  );
};

export default AdminMenuScreen;
