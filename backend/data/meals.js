let meals = [
  {
    name: 'Whopper',
    price: 660,
    foodType: 'Burger',
    image: '/images/1b.jpg',
    orders: 8,
    rating: 4.7,
    description: 'A special Burger with extra goodies.',
    numReviews: 8,
  },
  {
    name: 'Whopper Sandwich',
    price: 880,
    foodType: 'Sandwitch',
    image: '/images/2b.jpg',
    orders: 3,
    rating: 5.0,
    description: 'A special sandwitch with extra goodies.',
    numReviews: 3,
  },
  {
    name: 'Whopper with Cheese',
    price: 790,
    foodType: 'Burger',
    image: '/images/3b.jpg',
    orders: 7,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Bacon and Cheese Whopper',
    price: 400,
    foodType: 'Burger',
    image: '/images/4b.jpg',
    orders: 1,
    rating: 4.5,
    description: 'A special burger with extra goodies.',
    numReviews: 1,
  },
  {
    name: 'Double Whopper',
    price: 1000,
    foodType: 'Burger',
    image: '/images/5b.jpg',
    orders: 7,
    rating: 4.2,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Double Whopper with Cheese',
    price: 1200,
    foodType: 'Burger',
    image: '/images/6b.jpg',
    orders: 8,
    rating: 5.0,
    description: 'A special burger with extra goodies.',
    numReviews: 8,
  },
  {
    name: 'Triple Whopper',
    price: 1790,
    foodType: 'Burger',
    image: '/images/7b.jpg',
    orders: 2,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 2,
  },
  {
    name: 'Triple Whopper with Cheese',
    price: 1900,
    foodType: 'Burger',
    image: '/images/8b.jpg',
    orders: 7,
    rating: 4.5,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Bacon King',
    price: 2790,
    foodType: 'Burger',
    image: '/images/9b.jpg',
    orders: 5,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 5,
  },
  {
    name: 'Double Whopper Bacon King',
    price: 1790,
    foodType: 'Burger',
    image: '/images/10b.jpg',
    orders: 7,
    rating: 5.0,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Rodeo Burger',
    price: 290,
    foodType: 'Burger',
    image: '/images/11b.jpg',
    orders: 7,
    rating: 4.9,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Big King',
    price: 1090,
    foodType: 'Burger',
    image: '/images/12b.jpg',
    orders: 7,
    rating: 4.6,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Junior Whopper',
    price: 190,
    foodType: 'Burger',
    image: '/images/13b.jpg',
    orders: 1,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 1,
  },
  {
    name: 'Whopper Junior',
    price: 790,
    foodType: 'Burger',
    image: '/images/14b.jpg',
    orders: 3,
    rating: 4.4,
    description: 'A special burger with extra goodies.',
    numReviews: 3,
  },
  {
    name: 'Jr Whopper',
    price: 190,
    foodType: 'Burger',
    image: '/images/15b.jpg',
    orders: 7,
    rating: 4.4,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Whopper Jr',
    foodType: 'Burger',
    price: 400,
    foodType: 'Burger',
    image: '/images/16b.jpg',
    orders: 7,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Chicken Junior',
    price: 300,
    foodType: 'Burger',
    image: '/images/17b.jpg',
    orders: 7,
    rating: 4.0,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Chicken Jr',
    price: 500,
    foodType: 'Burger',
    image: '/images/18b.jpg',
    orders: 7,
    rating: 4.8,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Spicy Chicken Junior',
    price: 1000,
    foodType: 'Burger',
    image: '/images/19b.jpg',
    orders: 7,
    rating: 4.6,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Spicy Chicken Jr',
    price: 390,
    foodType: 'Burger',
    image: '/images/20b.jpg',
    orders: 7,
    rating: 4.6,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Veggie Burger',
    price: 770,
    foodType: 'Burger',
    image: '/images/21b.jpg',
    orders: 7,
    rating: 4.2,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'BK Veggie Burger',
    price: 490,
    foodType: 'Burger',
    image: '/images/22b.jpg',
    orders: 7,
    rating: 4.1,
    description: 'A special burger with extra goodies.',
    numReviews: 7,
  },
  {
    name: 'Chicken Burrito',
    foodType: 'Burrito',
    price: 975,
    image: '/images/buritto1.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best burrito with many addons',
    numReviews: 7,
  },
  {
    name: 'Steak Burrito',
    foodType: 'Burrito',
    price: 945,
    image: '/images/buritto2.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best burrito with many addons',
    numReviews: 7,
  },
  {
    name: 'Carnitas Burrito',
    foodType: 'Burrito',
    price: 1005,
    image: '/images/buritto3.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best burrito with many addons',
    numReviews: 7,
  },
  {
    name: 'Barbacoa Burrito',
    foodType: 'Burrito',
    price: 965,
    image: '/images/buritto4.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best burrito with many addons',
    numReviews: 7,
  },
  {
    name: 'Chorizo Burrito',
    foodType: 'Burrito',
    price: 1095,
    image: '/images/buritto5.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best burrito with many addons',
    numReviews: 7,
  },
  {
    name: 'Chicken Corn Tortilla Taco',
    foodType: 'Taco',
    price: 650,
    image: '/images/taco1.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best taco with many addons',
    numReviews: 7,
  },
  {
    name: 'Chicken Flour Tortilla Taco',
    foodType: 'Taco',
    price: 700,
    image: '/images/taco2.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best Tacos with many addons',
    numReviews: 7,
  },
  {
    name: 'Steak Corn Tortilla Taco',
    foodType: 'Taco',
    price: 620,
    image: '/images/taco3.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best Tacos with many addons',
    numReviews: 7,
  },
  {
    name: 'Steak Flour Tortilla Taco',
    foodType: 'Taco',
    price: 670,
    image: '/images/taco4.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best Tacos with many addons',
    numReviews: 7,
  },
  {
    name: 'Carnitas Corn Tortilla Taco',
    foodType: 'Taco',
    price: 680,
    image: '/images/taco5.jpg',
    orders: 7,
    rating: 4.7,
    description: 'Best Tacos with many addons',
    numReviews: 7,
  },
  {
    name: 'Original Recipe Chicken Drumstick',
    foodType: 'Chicken',
    price: 130,
    image: '/images/chicken1.jpg',
    orders: 7,
    rating: 4.3,
    description: 'Best Chicken with your desired taste',
    numReviews: 7,
  },
  {
    name: 'Original Recipe Chicken Thigh',
    foodType: 'Chicken',
    price: 280,
    image: '/images/chicken2.jpg',
    orders: 7,
    rating: 4.9,
    description: 'Best Chicken with your desired taste',
    numReviews: 7,
  },
  {
    name: 'Original Recipe Chicken Whole Wing',
    foodType: 'Chicken',
    price: 130,
    image: '/images/chicken3.jpg',
    orders: 7,
    rating: 4.6,
    description: 'Best Chicken with your desired taste',
    numReviews: 7,
  },
  {
    name: 'Extra Crispy Chicken',
    foodType: 'Chicken',
    price: 530,
    image: '/images/chicken4.jpg',
    orders: 7,
    rating: 4.8,
    description: 'Best Chicken with your desired taste',
    numReviews: 7,
  },
  {
    name: 'Pepperoni and Sausage',
    foodType: 'Pizza',
    sizes: [
      {
        size: 'Eight Inch',
        diameter: 8,
        slicesPerPizza: 4,
        price: 240,
      },
      { size: 'Small', slicesPerPizza: 4, price: 230 },
      { size: 'Medium', slicesPerPizza: 6, price: 240 },
      { size: 'Large', slicesPerPizza: 8, price: 340 },
    ],
    addons: [
      { addOnName: 'Pineapple', addOnPrice: 70 },
      { addOnName: 'Golden Corn', addOnPrice: 80 },
      { addOnName: 'Black Olives', addOnPrice: 40 },
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
      {
        size: 'Eight Inch',
        diameter: 8,
        slicesPerPizza: 4,
        price: 220,
      },
      { size: 'Small', slicesPerPizza: 4, price: 210 },
      { size: 'Medium', slicesPerPizza: 6, price: 220 },
      { size: 'Large', slicesPerPizza: 8, price: 320 },
    ],
    addons: [
      { addOnName: 'Pineapple', addOnPrice: 70 },
      { addOnName: 'Tomato', addOnPrice: 80 },
      { addOnName: 'Jalapeno', addOnPrice: 40 },
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
      { size: 'Small', slicesPerPizza: 4, sliceCalories: 210 },
      { size: 'Medium', slicesPerPizza: 6, sliceCalories: 220 },
      { size: 'Large', slicesPerPizza: 8, sliceCalories: 300 },
    ],
    addons: [
      { addOnName: 'Pineapple', addOnPrice: 70 },
      { addOnName: 'Tomato', addOnPrice: 80 },
      { addOnName: 'Jalapeno', addOnPrice: 40 },
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
      {
        size: 'Eight Inch',
        diameter: 8,
        slicesPerPizza: 4,
        price: 240,
      },
      { size: 'Small', slicesPerPizza: 4, price: 230 },
      { size: 'Medium', slicesPerPizza: 6, price: 240 },
      { size: 'Large', slicesPerPizza: 8, price: 340 },
      {
        size: 'Extra Large',
        diameter: 16,
        slicesPerPizza: 10,
        price: 360,
      },
    ],
    addons: [
      { addOnName: 'Pineapple', addOnPrice: 70 },
      { addOnName: 'Tomato', addOnPrice: 80 },
      { addOnName: 'Jalapeno', addOnPrice: 40 },
    ],
    price: 510,
    image: '/images/pizza4.jpg',
    orders: 6,
    rating: 4.8,
    description: 'Best pizza with taste like no other',
    numReviews: 6,
  },
];

export default meals;