import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { signup } from '../actions/userActions';

const SignUpScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);

  const redirect = location.search ? location.search.split('=')[1] : '/menu';

  const { loading, error, userInfo } = userSignup;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const signupHandler = () => {
    dispatch(signup(name, email, password, isAdmin));
  };

  return (
    <section className='section bd-container-signup'>
      <div className='flex-container-login'>
        {loading ? (
          <Loader size='small'></Loader>
        ) : (
          <>
            <div className='login-topic'>Sign up to Green Kitchen</div>
            {error ? (
              <Message variant='danger' size='small' message={error}></Message>
            ) : (
              <></>
            )}

            <input
              type='text'
              name='name'
              id=''
              className='name-signup-input'
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type='email'
              name='email'
              id=''
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
              className='login-button'
              type='button'
              value='Login'
              onClick={signupHandler}
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

export default SignUpScreen;
