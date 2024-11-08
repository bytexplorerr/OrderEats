import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import { ActivePageContext } from '../store/ActivePage';
import { CartIconDispayContext } from '../store/CartIconDisplay';
import Profile from './Profile';
const Navbar = ({logedIn}) => {
  const {displayCart,setDisplayCart} = useContext(CartIconDispayContext);
  const {activeLink,setActiveLink,token,setToken} = useContext(ActivePageContext);

  const getTokenWithExpiry = () => {
    const tokenStr = localStorage.getItem('token');
    if(!tokenStr)
      return null;
    try 
    {
      const tokenData = JSON.parse(tokenStr); 
      const now = new Date();
      
      if (now.getTime() > tokenData.expiry) 
      {
        localStorage.removeItem('token');
        return null;
      }
      
      return tokenData.token; 
    } 
    catch (error) 
    {
      console.error('Error parsing token data:', error);
      localStorage.removeItem('token');
      return null;
    }
  };

  useEffect(() => {
    const token = getTokenWithExpiry();
    if (!token)
    {
      setToken("");
    } 
    else 
    {
      setToken(token);
    }
  }, []);

  return (
    <section className={styles.container}>
        <div>
          <Link to = "/" style={{'textDecoration':'none'}}><h1 className={styles.homeLogo} onClick={()=>setActiveLink("Home")}>OrderEats</h1></Link>
        </div>
        <nav>
          <Link to = "/" className={`${styles.nav} ${activeLink==="Home"?styles.active:""} `} onClick={()=>setActiveLink("Home")}>Home</Link>
          <Link to = "/menu" className={`${styles.nav} ${activeLink==="Menu"?styles.active:""} `} onClick={()=>setActiveLink("Menu")}>Menu</Link>
          <Link to = "/mobile-app" className={`${styles.nav} ${activeLink==="Mobile-App"?styles.active:""} `} onClick={()=>setActiveLink("Mobile-App")}>Mobile-App</Link>
          <Link to = "/contact-us" className={`${styles.nav} ${activeLink==="Contact Us"?styles.active:""} `} onClick={()=>setActiveLink("Contact Us")}>Contact Us</Link>
        </nav>
        <div className={styles.info}>
           {/* <img src = {assets.search_icon} alt = "search_icon" style={{'cursor':'pointer'}}/> */}
          <div className={styles.cart}>
          <div className={displayCart?styles.dot:""}></div>
            <Link to = "/cart">
              <img src = {assets.basket_icon} alt = "cart" />
            </Link>
          </div>
          {!localStorage.getItem("token") ? <Link to = "/signup" className={styles.login}>Log in</Link> : <Profile />}
        </div>
    </section>
  )
}

export default Navbar