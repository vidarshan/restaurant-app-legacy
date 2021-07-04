import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../../actions/categoryActions';
import Category from '../../components/Category';
import { map } from '../../lodash';

import '../../assets/scss/categories.scss';
const AdminCategoriesScreen = () => {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);

  const { categories, loading, error } = categoriesList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <section className='section bd-container-meals' id='menu'>
      <table>
        <tr>
          <th>Category Name</th>
          <th>Category Image</th>
          <th></th>
          <th></th>
        </tr>
        {map(categories, (category) => {
          return (
            <tr>
              <td>{category.name}</td>
              <td>
                <img src={category.image} alt='' />
              </td>
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
    </section>
  );
};

export default AdminCategoriesScreen;
