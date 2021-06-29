import React from 'react';
import 'boxicons';

const Footer = () => {
  return (
    <footer className='footer section bd-container'>
      <div className='footer__container bd-grid'>
        <div className='footer__content'>
          <a href='/#' className='footer__logo'>
            Hot N' Crusty
          </a>
          <span className='footer__description'>Restaurant</span>
          <div>
            <a href='/#' className='footer__social'>
              <box-icon type='logo' name='facebook'></box-icon>
            </a>
            <a href='/#' className='footer__social'>
              {/* <box-icon name='instagram-alt' type='logo'></box-icon> */}
            </a>
            <a href='/#' className='footer__social'>
              {/* <box-icon name='twitter' type='logo' color='#4bc0ff'></box-icon> */}
            </a>
          </div>
        </div>

        <div className='footer__content'>
          <h3 className='footer__title'>Services</h3>
          <ul>
            <li>
              <a href='/#' className='footer__link'>
                Delivery
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Order Food
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Reserve
              </a>
            </li>
          </ul>
        </div>

        <div className='footer__content'>
          <h3 className='footer__title'>Information</h3>
          <ul>
            <li>
              <a href='/#' className='footer__link'>
                Contact us
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Privacy policy
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Terms of services
              </a>
            </li>
          </ul>
        </div>

        <div className='footer__content'>
          <h3 className='footer__title'>Adress</h3>
          <ul>
            <li>100B Horton Place</li>
            <li>Colombo 07 - Sri Lanka 🇱🇰</li>
            <li>011 - 288- 9374</li>
            <li>hotncrusty@email.com</li>
          </ul>
        </div>
      </div>

      <p className='footer__copy'>&#169; 2021 vidarshanr</p>
    </footer>
  );
};

export default Footer;
