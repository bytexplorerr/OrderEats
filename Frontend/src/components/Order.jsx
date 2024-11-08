import React, { useContext, useRef, useState } from 'react'
import CartTotal from './CartTotal'
import styles from "./Order.module.css"
import { CartIconDispayContext } from '../store/CartIconDisplay'
import axios from "axios";
const Order = () => {

  const {URL,token,foodDetails} = useContext(CartIconDispayContext);

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const street = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const zipcode = useRef(null);
  const country = useRef(null);
  const phone_number = useRef(null);


  const handleSubmit = async (event)=>{
    event.preventDefault();
    const totalPrice = foodDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const data = {
      firstName:firstName.current.value,
      lastName:lastName.current.value,
      email:email.current.value,
      street:street.current.value,
      city:city.current.value,
      state:state.current.value,
      zipcode:zipcode.current.value,
      country:country.current.value,
    };
    let orderData = {
      address:data,
      items:foodDetails,
      amount:totalPrice+5,
    }
    const response = await axios.post(`${URL}/api/order/place`,orderData,{headers: {authorization: `Bearer ${token}`}});
    console.log(response);
    if(response.data.success)
    {
      firstName.current.value = "";
      lastName.current.value = "";
      email.current.value = ""; 
      street.current.value = "";
      city.current.value = "";
      state.current.value = "";
      zipcode.current.value = "";
      country.current.value = "";
      
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else
    {
      alert("Error!");
    }
  }

  return (
    <main>
        <CartTotal />
        <div className={styles.order}>
        <h1>Delivery Information</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.multiple}>
            <input type = "text" placeholder="First Name" required ref={firstName}></input>
            <input type = "text" placeholder="Last Name" required ref={lastName}></input>
            </div>
            <input type = "email" placeholder="Email address" required ref={email}></input>
            <input type = "text" placeholder="Street" required ref={street}></input>
            <div className={styles.multiple}>
            <input type = "text" placeholder="City" required ref={city}></input>
            <input type = "text" placeholder="State" required ref={state}></input>
            </div>
            <div className={styles.multiple}>
            <input type = "number" placeholder="Zip code" required ref={zipcode}></input>
            <input type = "text" placeholder="Country" required ref={country}></input>
            </div>
            <input type = "number" placeholder="Phone" required ref={phone_number}></input>
            <button type = "submit">Proceed to payment</button>
        </form>
        </div>
    </main>
  )
}

export default Order