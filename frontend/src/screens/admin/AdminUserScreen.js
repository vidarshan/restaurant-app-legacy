import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';

import '../../assets/scss/admin/users.scss';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const AdminUserScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const { users, loading, error } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <section className='section bd-container-meals' id='menu'>
      {error ? (
        <Message size='full' message={error}></Message>
      ) : loading ? (
        <Loader></Loader>
      ) : (
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
          {map(users, (user) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{!user.isAdmin ? 'No' : 'Yes'}</td>
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

export default AdminUserScreen;
