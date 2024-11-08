import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import MenuComponent from './components/MenuComponent';
import Home from './components/Home';
import Footer from './components/Footer';
import DownloadApp from './components/DownloadApp';
import Signup from "./components/Signup";
import Login from './components/Login';
import Cart from './components/Cart';
import EmptyCart from './components/EmptyCart';
import Order from './components/Order';
import ForgotPass from './components/ForgotPass';
import { useState } from 'react';
import { CartIconDispayContext } from './store/CartIconDisplay';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './components/Verify';
import MyOrders from './components/MyOrders';

const App = () => {
  const [logedIn,setLogedIn] = useState(false);
  const {displayCart} = useContext(CartIconDispayContext);
  return (
    <div className='app'>
      <Router>
      <ToastContainer />
      <Navbar logedIn={logedIn}/>
      <Routes>
      <Route path = "/" element={<Home />} />
        <Route path = "/menu" element={<MenuComponent />} />
        <Route path = "/mobile-app" element = {<DownloadApp />} />
        <Route path = "/contact-us" element = {<DownloadApp />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/login" element = {<Login setLogedIn={setLogedIn}/>}/>
        {displayCart && <Route path = "/cart" element = {<Cart />}></Route>}
        {!displayCart && <Route path = "/cart" element = {<EmptyCart />}></Route>}
        <Route path = "/forgot-password" element = {<ForgotPass />}></Route>
        <Route path = "/order" element ={<Order />} />
        <Route path = "/verify" element={<Verify />}></Route>
        <Route path = "/myorders" element={<MyOrders />}></Route>
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App