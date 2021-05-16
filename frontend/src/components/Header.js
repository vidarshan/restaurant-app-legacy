import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'boxicons';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <a href='/#' className='scrolltop scroll-top' id='scroll-top'>
        <box-icon
          name='chevron-up'
          type='solid'
          className='scrolltop__icon'></box-icon>
      </a>

      <header className='l-header scroll-header' id='header'>
        <nav className='nav bd-container'>
          <Link to='/' className='nav__logo'>
            Tasty
          </Link>
          <div className='nav__menu' id='nav-menu'>
            <ul className='nav__list'>
              <li className='nav__item'>
                <Link to='/' className='nav__link'>
                  Home
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/menu' className='nav__link'>
                  Menu
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/about' className='nav__link'>
                  About
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/order' className='nav__link'>
                  <box-icon name='shopping-bag'></box-icon>
                </Link>
              </li>
              {/* <li className='nav__item'>
                <box-icon
                  name='moon'
                  color='#a6a6a6'
                  className='change-theme'
                  id='theme-button'></box-icon>
              </li> */}
              {userInfo ? (
                <li className='nav__item'>
                  <Link to='/profile' className='nav__link'>
                    <box-icon name='user'></box-icon>
                  </Link>
                </li>
              ) : (
                <li className='nav__item'>
                  <Link to='/login' className='nav__link'>
                    <box-icon name='log-in' color='#a6a6a6'></box-icon>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className='nav__toggle' id='nav-toggle'>
            <i className='bx bx-menu'></i>
            <box-icon name='menu'></box-icon>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
