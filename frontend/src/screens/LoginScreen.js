import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/menu';
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const loginHandler = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  return (
    <section className='section bd-container-login'>
      <div className='flex-container-login'>
        {loading ? (
          <Loader size='small'></Loader>
        ) : (
          <>
            <div className='login-topic'>Login to Green Kitchen</div>
            {error ? (
              <Message variant='danger' size='small' message={error}></Message>
            ) : (
              <></>
            )}
            <input
              type='text'
              name='email'
              id=''
              className='email-login-input'
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type='password'
              name='password'
              className='password-login-input'
              id=''
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className='login-button'
              type='button'
              value='Login'
              onClick={loginHandler}
            />
            <div className='signin-redirect'>
              Don't have an account? <a href='/'>Sign in</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginScreen;
