import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import MealScreen from './screens/MealScreen';
import AboutScreen from './screens/AboutScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Route path='/' component={HomeScreen} exact></Route>
      <Route path='/login' component={LoginScreen}></Route>
      <Route path='/signup' component={SignUpScreen}></Route>
      <Route path='/menu' component={MenuScreen}></Route>
      <Route path='/meal/:id' component={MealScreen}></Route>
      <Route path='/order/:id?' component={OrderScreen}></Route>
      <Route path='/profile' component={ProfileScreen}></Route>
      <Route path='/about' component={AboutScreen}></Route>
      <Footer></Footer>
    </Router>
  );
};

export default App;
