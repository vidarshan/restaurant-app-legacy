import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      console.log(user.name);
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const profileHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <section className='section bd-container' id='menu'>
      <div className='flex-container-profile'>
        <div class='flex-item-left'>
          {loading && <Loader size='small'></Loader>}
          {success && (
            <Message
              message='Profile Updated'
              variant='success'
              size='small'></Message>
          )}
          <input
            type='text'
            name='name'
            id=''
            value={name}
            className='name-signup-input'
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type='email'
            name='email'
            id=''
            value={email}
            className='email-signup-input'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            name='password'
            className='password-signup-input'
            id=''
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type='password'
            name='confirmPassword'
            className='password-signup-input'
            id=''
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            className='login-button'
            type='button'
            value='Login'
            onClick={profileHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileScreen;
