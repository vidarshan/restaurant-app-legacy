import './App.css';
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
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminReservationScreen from './screens/admin/AdminReservationScreen';
import AdminUserScreen from './screens/admin/AdminUserScreen';
import AdminOrderScreen from './screens/admin/AdminOrderScreen';
import AdminMenuScreen from './screens/admin/AdminMenuScreen';
import AdminCategoryScreen from './screens/admin/AdminCategoryScreen';
import CategoryForm from './screens/forms/CategoryForm';

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
      <Route path='/admin/dashboard' component={AdminDashboardScreen}></Route>
      <Route
        path='/admin/reservations'
        component={AdminReservationScreen}></Route>
      <Route path='/admin/meals' component={AdminMenuScreen}></Route>
      <Route path='/admin/orders' component={AdminOrderScreen}></Route>
      <Route path='/admin/users' component={AdminUserScreen}></Route>
      <Route path='/admin/categories' component={AdminCategoryScreen}></Route>
      <Route path='/admin/category/:id?' component={CategoryForm}></Route>
      <Route path='/about' component={AboutScreen}></Route>
      <Footer></Footer>
    </Router>
  );
};

export default App;
