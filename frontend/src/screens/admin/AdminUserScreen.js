import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listUsers,
  changeUserLevel,
  deleteUser,
} from '../../actions/userActions';
import '../../assets/scss/admin/users.scss';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const AdminUserScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);
  const changeLevel = useSelector((state) => state.changeUserLevel);
  const deletedUser = useSelector((state) => state.deleteUser);

  const { loading: userloading, error: usererror, userInfo } = userLogin;
  const { users, loading, error } = userList;

  const { success: successchangelevel } = changeLevel;

  const { success: successdelete } = deletedUser;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    dispatch(listUsers());
  }, [successdelete, successchangelevel, dispatch]);

  const deleteUserHandler = (id) => {
    if (window.confirm('Delete User ?')) {
      dispatch(deleteUser(id));
    }
  };

  const changeUserLevelHandler = (id) => {
    if (window.confirm('Make this user an admin?')) {
      dispatch(changeUserLevel(id));
    }
  };

  return (
    <section className='section bd-container-users' id='menu'>
      {error ? (
        <Message size='full' message={error}></Message>
      ) : loading ? (
        <Loader></Loader>
      ) : (
        <>
          <table>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Admin/ Not Admin</th>
              <th>Delete User</th>
            </tr>
            {map(users, (user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {!user.isAdmin ? (
                      <div
                        className='make-admin-button'
                        onClick={() => changeUserLevelHandler(user._id)}>
                        <box-icon name='shield-x'></box-icon>
                      </div>
                    ) : (
                      <div
                        className='remove-admin-button'
                        onClick={() => changeUserLevelHandler(user._id)}>
                        <box-icon name='check-shield'></box-icon>
                      </div>
                    )}
                  </td>
                  <td>
                    <div
                      className='action-icon-delete'
                      onClick={() => deleteUserHandler(user._id)}>
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

export default AdminUserScreen;
