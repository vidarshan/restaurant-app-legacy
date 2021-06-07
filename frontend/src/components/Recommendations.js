import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listMeals } from '../actions/mealActions';
import { map, take } from '../lodash';

import '../assets/scss/recommendations.scss';

const Recommendations = ({ heading, emoji, items, orientation }) => {
  const dispatch = useDispatch();

  const meals = [
    {
      name: 'Pepperoni and Sausage',
      foodType: 'Pizza',
      sizes: [
        { size: 'Small', slicesPerPizza: 4, price: 230 },
        { size: 'Medium', slicesPerPizza: 6, price: 240 },
        { size: 'Large', slicesPerPizza: 8, price: 340 },
      ],
      addons: [
        { addOnName: '🍍Pineapple', addOnPrice: 70 },
        { addOnName: '🌶️Chilli', addOnPrice: 10 },
        { addOnName: '🌽Corn', addOnPrice: 60 },
        { addOnName: '🍅Tomato', addOnPrice: 80 },
        { addOnName: '🧀Cheese', addOnPrice: 50 },
      ],
      price: 510,
      image: '/images/pizza1.jpg',
      orders: 6,
      rating: 4.8,
      description: 'Best pizza with taste like no other',
      numReviews: 6,
    },
    {
      name: 'Pepperoni and Sausage',
      foodType: 'Pizza',
      sizes: [
        { size: 'Small', slicesPerPizza: 4, price: 230 },
        { size: 'Medium', slicesPerPizza: 6, price: 240 },
        { size: 'Large', slicesPerPizza: 8, price: 340 },
      ],
      addons: [
        { addOnName: '🍍Pineapple', addOnPrice: 70 },
        { addOnName: '🌶️Chilli', addOnPrice: 10 },
        { addOnName: '🌽Corn', addOnPrice: 60 },
        { addOnName: '🍅Tomato', addOnPrice: 80 },
        { addOnName: '🧀Cheese', addOnPrice: 50 },
      ],
      price: 510,
      image: '/images/pizza1.jpg',
      orders: 6,
      rating: 4.8,
      description: 'Best pizza with taste like no other',
      numReviews: 6,
    },
    {
      name: 'Garden Fresh',
      foodType: 'Pizza',
      sizes: [
        { size: 'Small', slicesPerPizza: 4, price: 210 },
        { size: 'Medium', slicesPerPizza: 6, price: 220 },
        { size: 'Large', slicesPerPizza: 8, price: 320 },
      ],
      addons: [
        { addOnName: '🍍Pineapple', addOnPrice: 70 },
        { addOnName: '🌶️Chilli', addOnPrice: 10 },
        { addOnName: '🌽Corn', addOnPrice: 60 },
        { addOnName: '🍅Tomato', addOnPrice: 80 },
        { addOnName: '🧀Cheese', addOnPrice: 50 },
      ],
      price: 510,
      image: '/images/pizza2.jpg',
      orders: 10,
      rating: 4.0,
      description: 'Best pizza with taste like no other',
      numReviews: 10,
    },
    {
      name: 'Spinach and Feta',
      foodType: 'Pizza',
      sizes: [
        { size: 'Small', slicesPerPizza: 4, price: 210 },
        { size: 'Medium', slicesPerPizza: 6, price: 220 },
        { size: 'Large', slicesPerPizza: 8, price: 300 },
      ],
      addons: [
        { addOnName: '🍍Pineapple', addOnPrice: 70 },
        { addOnName: '🌶️Chilli', addOnPrice: 10 },
        { addOnName: '🌽Corn', addOnPrice: 60 },
        { addOnName: '🍅Tomato', addOnPrice: 80 },
        { addOnName: '🧀Cheese', addOnPrice: 50 },
      ],
      price: 510,
      image: '/images/pizza3.jpg',
      orders: 6,
      rating: 4.8,
      description: 'Best pizza with taste like no other',
      numReviews: 6,
    },
    {
      name: 'Philly Cheese Steak',
      foodType: 'Pizza',
      sizes: [
        { size: 'Small', slicesPerPizza: 4, price: 230 },
        { size: 'Medium', slicesPerPizza: 6, price: 240 },
        { size: 'Large', slicesPerPizza: 8, price: 340 },
      ],
      addons: [
        { addOnName: '🍍Pineapple', addOnPrice: 70 },
        { addOnName: '🌶️Chilli', addOnPrice: 10 },
        { addOnName: '🌽Corn', addOnPrice: 60 },
        { addOnName: '🍅Tomato', addOnPrice: 80 },
        { addOnName: '🧀Cheese', addOnPrice: 50 },
      ],
      price: 510,
      image: '/images/pizza4.jpg',
      orders: 6,
      rating: 4.8,
      description: 'Best pizza with taste like no other',
      numReviews: 6,
    },
  ];

  let s = take(meals, items);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  return (
    <div className='recommendations-container'>
      <div className='recommendations-heading'>
        {heading} {emoji}
      </div>
      <div className='recommendations-items'>
        {map(s, (meal) => {
          return (
            <>
              <div
                className={
                  orientation === 'vertical' ? 'card full-width' : 'card'
                }>
                <div className='card-details'>
                  <div className='card-title'>{meal.name}</div>
                  <div className='card-starting-price-label'>Starting from</div>
                  <div className='starting-price'>${meal.price}</div>
                  <div className='card-reason'>Most Ordered this week</div>
                </div>
                <div className='card-image'>
                  <img src={meal.image} alt='' />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
