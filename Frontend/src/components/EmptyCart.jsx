import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import styles from "./EmptyCart.module.css";
import { ActivePageContext } from '../store/ActivePage';
const EmptyCart = () => {
  const {activeLink,setActiveLink} = useContext(ActivePageContext);
  useEffect(()=>{
    setActiveLink("Other");
  },[]);
  return (
    <div className={styles.empty_cart}>
        <img src = {assets.cart_empty} alt = "empty_cart_icon" />
        <p>You can go to home page to view more items</p>
    </div>
  )
}

export default EmptyCart