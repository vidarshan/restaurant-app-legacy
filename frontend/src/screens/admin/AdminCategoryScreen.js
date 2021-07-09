import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../../actions/categoryActions';
import { map } from '../../lodash';

import '../../assets/scss/admin/categories.scss';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
const AdminCategoriesScreen = () => {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);

  const { categories, loading, error } = categoriesList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <section className='section bd-container-categories' id='menu'>
      {error ? (
        <Message message={error} variant='danger' size='full'></Message>
      ) : loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className='add-search-container'>
            <input type='text' className='text-input' />
            <div className='add-category-button'>
              <Link to='/admin/category'>
                <box-icon name='plus'></box-icon>
              </Link>
            </div>
          </div>
          {/* <div className='category-form-container'>
            <div className='heading-3'>Add New Category</div>
            <div className='category-form'>
              <input type='text' className='text-input' />
              <input type='text' className='text-input' />
              <div className='add-category-button'>Add Category</div>
            </div>
          </div> */}
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
                      <Link to={`/admin/category/${category._id}`}>
                        <box-icon name='edit'></box-icon>
                      </Link>
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
        </>
      )}
    </section>
  );
};

export default AdminCategoriesScreen;
