import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../assets/scss/auth.scss';

import { signup, login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ location, history }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin] = useState(false);

  const redirect = location.search ? location.search.split('=')[1] : '/menu';
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const loginHandler = () => {
    dispatch(login(email, password));
  };

  const signupHandler = () => {
    dispatch(signup(name, email, password, isAdmin));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  return (
    <section className='section bd-container-login'>
      <div className='login-form-container'>
        {loading ? (
          <Loader size='small'></Loader>
        ) : (
          <div className='login-form-container'>
            <div className='login-auth'>
              {error ? (
                <Message
                  variant='danger'
                  size='small'
                  message={error}></Message>
              ) : (
                <></>
              )}
              {isLogin ? (
                <>
                  <div className='login-topic'>
                    {isLogin ? 'Log in ' : 'Sign up '}to Green Kitchen
                  </div>
                  <input
                    type='text'
                    name='email'
                    placeholder='Your email'
                    className='email-input'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type='password'
                    name='password'
                    placeholder='Your password'
                    className='password-input'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className='login-button'
                    type='button'
                    value='Login'
                    onClick={loginHandler}
                  />
                  <div
                    className='auth-redirect'
                    onClick={() => setIsLogin(false)}>
                    Don't have an account? Sign up
                  </div>
                </>
              ) : (
                <>
                  <div className='login-topic'>Sign up to Green Kitchen</div>

                  <input
                    type='text'
                    name='name'
                    placeholder='Your name'
                    className='name-input'
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    className='email-input'
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type='password'
                    name='password'
                    className='password-input'
                    placeholder='Your password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className='login-button'
                    type='button'
                    value={isLogin ? 'Log In' : 'Sign Up'}
                    onClick={signupHandler}
                  />
                  <div
                    className='auth-redirect'
                    onClick={() => setIsLogin(true)}>
                    Have an account? Log In
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginScreen;
