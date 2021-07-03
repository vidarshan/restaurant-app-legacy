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

  console.log(userInfo);
  const { orderCount } = ordercount;

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };

  const activateTheme = () => {
    const themeButton = document.getElementById('theme-button');

    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? 'dark' : 'light';

    const getCurrentIcon = () =>
      document.body.classList.contains(iconTheme) ? 'moon' : 'sun';

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
          {!userInfo || !userInfo.isAdmin ? (
            <Link to='/' className='nav__logo'>
              Chillie
            </Link>
          ) : (
            <Link to='#' className='nav__logo'>
              Admin Panel
            </Link>
          )}

          <div className='nav__menu' id='nav-menu'>
            {!userInfo || !userInfo.isAdmin ? (
              <ul className='nav__list'>
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
                  <box-icon name='moon'></box-icon>
                </li>

                <li className='nav__item'>
                  <Link to='/order' className='nav__link'>
                    <box-icon name='shopping-bag'></box-icon>
                  </Link>

                  <Badge
                    className='badge-position'
                    count={orderCount}
                    variant='red'
                    size='sm'></Badge>
                </li>

                {userInfo ? (
                  <li className='nav__item'>
                    <Link to='/profile' className='nav__link'>
                      <box-icon name='user' type='solid'></box-icon>
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
            ) : (
              <ul className='nav__list'>
                <li className='nav__item'>
                  <Link to='/admin/orders' className='nav__link'>
                    Orders
                  </Link>
                </li>
                <li className='nav__item'>
                  <Link to='/admin/meals' className='nav__link'>
                    Meals
                  </Link>
                </li>
                <li className='nav__item'>
                  <Link to='/admin/categories' className='nav__link'>
                    Categories
                  </Link>
                </li>
                <li className='nav__item'>
                  <Link to='/admin/users' className='nav__link'>
                    Users
                  </Link>
                </li>
                <li
                  className='nav__item'
                  id='theme-button'
                  onClick={() => activateTheme()}>
                  <box-icon name='moon'></box-icon>
                </li>

                <li className='nav__item'>
                  <Link to='/profile' className='nav__link'>
                    <box-icon name='user' type='solid'></box-icon>
                  </Link>
                </li>
              </ul>
            )}
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
