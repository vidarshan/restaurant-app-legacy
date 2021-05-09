import React from 'react';
import 'boxicons';

const Footer = () => {
  return (
    <footer className='footer section bd-container'>
      <div className='footer__container bd-grid'>
        <div className='footer__content'>
          <a href='/#' className='footer__logo'>
            Tasty Food
          </a>
          <span className='footer__description'>Restaurant</span>
          <div>
            <a href='/#' className='footer__social'>
              <box-icon
                name='facebook-circle'
                type='logo'
                color='#3492ff'></box-icon>
            </a>
            <a href='/#' className='footer__social'>
              <box-icon name='instagram' type='logo' color='#a66e00'></box-icon>
            </a>
            <a href='/#' className='footer__social'>
              <box-icon name='twitter' type='logo' color='#4bc0ff'></box-icon>
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
                Pricing
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Fast food
              </a>
            </li>
            <li>
              <a href='/#' className='footer__link'>
                Reserve your spot
              </a>
            </li>
          </ul>
        </div>

        <div className='footer__content'>
          <h3 className='footer__title'>Information</h3>
          <ul>
            <li>
              <a href='/#' className='footer__link'>
                Event
              </a>
            </li>
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
            <li>Lima - Peru</li>
            <li>Jr Union #999</li>
            <li>999 - 888 - 777</li>
            <li>tastyfood@email.com</li>
          </ul>
        </div>
      </div>

      <p className='footer__copy'>&#169; 2020 Bedimcode. All right reserved</p>
    </footer>
  );
};

export default Footer;
