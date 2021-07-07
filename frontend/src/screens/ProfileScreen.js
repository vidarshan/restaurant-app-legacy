import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import socketIOClient from 'socket.io-client';

import '../assets/scss/profile.scss';
import '../assets/scss/components/inputs.scss';
import '../assets/scss/components/buttons.scss';
import '../assets/scss/components/headings.scss';
const ENDPOINT = 'http://127.0.0.1:5000';

const ProfileScreen = ({ history }) => {
  const [setResponse] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setMessage] = useState('');
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
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }

    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    console.log(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
      console.log(data);
    });
  }, [history, userInfo, dispatch, user, setResponse]);

  const profileHandler = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <section className='section bd-container-profile' id='menu'>
      <div className='flex__container--profile'>
        <div className='heading'>
          <p className='heading-2'>Your Profile</p>
        </div>

        {error && <Message message={error}></Message>}
        {loading && <Loader size='small'></Loader>}
        {success && (
          <Message
            message='Profile Updated'
            variant='success'
            size='small'></Message>
        )}

        <div className='input-flex'>
          <input
            type='text'
            name='name'
            value={name}
            className='text-input'
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type='email'
            name='email'
            id=''
            value={email}
            className='email-input'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-flex'>
          <input
            type='password'
            name='password'
            className='password-input'
            id=''
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type='password'
            name='confirmPassword'
            className='password-input'
            id=''
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='input-flex'>
          <div className='action-buttons'>
            <input
              className='button-primary'
              type='button'
              value='Update Profile'
              onClick={profileHandler}
            />
            <input
              className='button-danger'
              type='button'
              value='Delete Profile'
            />
          </div>
        </div>
      </div>
      <div className='flex__container--activity'></div>
    </section>
  );
};

export default ProfileScreen;
