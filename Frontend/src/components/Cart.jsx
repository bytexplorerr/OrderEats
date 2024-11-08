import React, { useContext, useEffect, useState } from 'react'
import { ActivePageContext } from '../store/ActivePage'
import { CartIconDispayContext } from '../store/CartIconDisplay';
import styles from "./Cart.module.css";
import { assets } from '../assets/assets'
import CartTotal from './CartTotal';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const Cart = () => {

  const {activeLink,setActiveLink} = useContext(ActivePageContext);
  const {URL,cartArr,token,fetchCartList,foodDetails} = useContext(CartIconDispayContext);
  const nevigate = useNavigate(); 
  useEffect(()=>{
    setActiveLink("Other");
  },[]);

  const handleRemove = async (id)=>{
    const response = await axios.post(`${URL}/api/cart/remove`,{
      itemId:id,
    },{headers:{authorization: `Bearer ${token}`}
    });
    await fetchCartList();
    };

  const handleOrder = (event)=>{
    event.preventDefault();
    if(localStorage.getItem("token") === null)
      nevigate("/login");
    else
      nevigate("/order");
  }
  return (
    <main>
      <table className={styles.cart}> 
        <thead>
        <tr>
          <th>Items</th>
          <th>Title</th>
          <th>Price</th>
          <th>Qunatity</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {foodDetails.map((item)=>{
          return(
            <tr key = {item._id}>
              <td><img src = {`${URL}/images/${item.image}`} alt = "food_image" className={styles.food_image}></img></td>
              <td><p>{item.name}</p></td>
              <td><p>${item.price}</p></td>
              <td> <p>{item.quantity}</p></td>
              <td><p>${item.price * item.quantity}</p></td>
              <td><img src = {assets.cross_icon} alt = "remove_icon" className={styles.remove_icon} onClick={() => handleRemove(item._id)}></img></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <CartTotal />
      <button type = "button" onClick={handleOrder}>Proceed to Checkout</button>
    </main>
  )
}

export default Cart