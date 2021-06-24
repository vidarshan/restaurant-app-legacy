import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Badge from '../components/Badge';
import 'boxicons';
//import { logout } from '../actions/userActions';
//import { countOrders } from '../actions/orderActions';

const Header = () => {
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const ordercount = useSelector((state) => state.orderCount);

  const { userInfo } = userLogin;
  const { orderCount } = ordercount;

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };

  const activateTheme = () => {
    console.log('theme');

    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? 'dark' : 'light';

    const getCurrentIcon = () =>
      document.body.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        darkTheme
      );
      themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
        iconTheme
      );
    }

    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon);
  };

  useEffect(() => {
    const toggle = document.getElementById('nav-toggle');
    let nav = document.getElementById('nav-menu');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
      });
    }

    console.log(orderCount);
  }, [orderCount]);

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
                  Meals
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/menu' className='nav__link'>
                  Reserve
                </Link>
              </li>

              <li
                className='nav__item'
                id='theme-button'
                onClick={() => activateTheme()}>
                Dark
              </li>

              <li className='nav__item'>
                <Link to='/order' className='nav__link badge-icon'>
                  <div className='shopping-bag-container'>
                    <box-icon name='shopping-bag'></box-icon>
                  </div>
                </Link>
                <Badge count={orderCount} variant='red' size='sm'></Badge>
              </li>

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
