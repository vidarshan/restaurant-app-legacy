import React from 'react';

import '../../assets/scss/dashboard.scss';

const AdminDashboardScreen = () => {
  return (
    <section className='section bd-container-dashboard' id='menu'>
      <div className='dashboard__cards'>
        <div className='dashboard__cards--orders'>
          <div className='card-icon'>
            <box-icon name='food-menu' color='#06B452'></box-icon>
          </div>
          <div className='card-stat'>40</div>
          <div className='card-text'>Orders</div>
        </div>
        <div className='dashboard__cards--users'>
          <div className='card-icon'>
            <box-icon name='user' type='solid' color='#B91925'></box-icon>
          </div>
          <div className='card-stat'>10</div>
          <div className='card-text'>Users</div>
        </div>
        <div className='dashboard__cards--meals'>
          <div className='card-icon'>
            <box-icon name='dish' type='solid' color='#009AD7'></box-icon>
          </div>
          <div className='card-stat'>100</div>
          <div className='card-text'>Meals</div>
        </div>
        <div className='dashboard__cards--categories'>
          <div className='card-icon'>
            <box-icon name='category' type='solid' color='#ff6c00'></box-icon>
          </div>
          <div className='card-stat'>8</div>
          <div className='card-text'>Categories</div>
        </div>
        <div className='dashboard__cards--reservations'>
          <div className='card-icon'>
            <box-icon name='chair' color='#A2B413'></box-icon>
          </div>
          <div className='card-stat'>8</div>
          <div className='card-text'>Reservations</div>
        </div>

        <div className='dashboard__cards--visits'>
          <div className='card-icon'>
            <box-icon name='trending-up' color='#644FB5'></box-icon>
          </div>
          <div className='card-stat'>1000</div>
          <div className='card-text'>Visits</div>
        </div>
      </div>

      <div className='dashboard__notifications'>
        <div className='dashboard__notifications--list'>
          {' '}
          <div className='meal-notification'>
            <div className='notification-icon'>
              <box-icon name='dish' type='solid' color='#009AD7'></box-icon>
            </div>
            <div className='notification-text'> New meal added</div>
          </div>
          <div className='order-notification'>
            <div className='notification-icon'>
              <box-icon name='food-menu' color='#06B452'></box-icon>
            </div>
            <div className='notification-text'>New order placed</div>
          </div>
          <div className='user-notification'>
            <div className='notification-icon'>
              <box-icon name='user' type='solid' color='#B91925'></box-icon>
            </div>
            <div className='notification-text'>New user joined</div>
          </div>
          <div className='meal-notification'>
            <div className='notification-icon'>
              <box-icon name='dish' type='solid' color='#009AD7'></box-icon>
            </div>
            <div className='notification-text'> New meal added</div>
          </div>
          <div className='category-notification'>
            <div className='notification-icon'>
              <box-icon name='category' type='solid' color='#ff6c00'></box-icon>
            </div>
            <div className='notification-text'> New category added</div>
          </div>{' '}
          <div className='meal-notification'>
            <div className='notification-icon'>
              <box-icon name='dish' type='solid' color='#009AD7'></box-icon>
            </div>
            <div className='notification-text'> New meal added</div>
          </div>
          <div className='category-notification'>
            <div className='notification-icon'>
              <box-icon name='category' type='solid' color='#ff6c00'></box-icon>
            </div>
            <div className='notification-text'> New category added</div>
          </div>
          <div className='category-notification'>
            <div className='notification-icon'>
              <box-icon name='category' type='solid' color='#ff6c00'></box-icon>
            </div>
            <div className='notification-text'> New category added</div>
          </div>
          <div className='meal-notification'>
            <div className='notification-icon'>
              <box-icon name='dish' type='solid' color='#009AD7'></box-icon>
            </div>
            <div className='notification-text'> New meal added</div>
          </div>
        </div>
      </div>

      <div className='dashboard__quick-actions'>
        <div className='stop-orders'>Stop Orders</div>
        <div className='cancel-reservations'>Cancel Reservations</div>
        <div className='add-new-meal'>Add New Meal</div>
        <div className='add-new-category'>Add New Category</div>
      </div>
    </section>
  );
};

export default AdminDashboardScreen;
