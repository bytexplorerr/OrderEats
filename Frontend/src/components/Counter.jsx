import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import styles from "./Counter.module.css"
import { CartIconDispayContext } from '../store/CartIconDisplay'
import axios from "axios"
const Counter = ({setSelectItem, totalItemsCount ,setTotalItemsCount,id,name,image,price}) => {

    const {URL,token,fetchCartList} = useContext(CartIconDispayContext);
    const [totalItems,setTotalItems] = useState(0);
    const handleDecrement = async ()=>{
      setTotalItems(prev => prev - 1);
      try
      {
        if(token)
          {
            await axios.post(`${URL}/api/cart/add`,{
              value:-1,
              itemId:id,
            },{headers: {authorization: `Bearer ${token}`}
           }); 
           await fetchCartList();
          }
      }
      catch(err)
      {
        console.log(err);
      }
      if(totalItems <= 1)
        setSelectItem(false);
    }
    const handleIncrement = async ()=>{
      setTotalItems(prev => prev + 1);
     try
     {
      if(token)
      {
        await axios.post(`${URL}/api/cart/add`,{
          value:1,
          itemId:id,
        },{headers: {authorization: `Bearer ${token}`}
        });
        await fetchCartList();
      }
     }
     catch(err)
     {
      console.log(err);
     }
    }
  return (
    <div className={styles.counter}>
        <img src = {assets.remove_icon_red} alt = "decrement_icon" onClick={handleDecrement}/>
        <p>{totalItems}</p>
        <img src = {assets.add_icon_green} alt = "increment_counter" onClick={handleIncrement}/>
    </div>
  )
}

export default Counter