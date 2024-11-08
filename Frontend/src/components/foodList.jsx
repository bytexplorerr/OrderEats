import React, { useContext, useEffect, useState } from 'react'
import FoodItem from './foodItem'
import styles from "./foodList.module.css";
import { ActiveMenuContext } from '../store/ActiveMenu';
import { CartIconDispayContext } from '../store/CartIconDisplay';
import axios from "axios"
const FoodList = () => {
  const {category} = useContext(ActiveMenuContext);
  const {URL} = useContext(CartIconDispayContext);
  const [foodList,setFoodList] = useState([]);

  const fetchList = async ()=>{
    const response = await axios.get(`${URL}/api/food/list`);
    setFoodList(response.data.data);
  }

  useEffect(()=>{
    fetchList();
  },[]);

  return (
    <div>
        <h2 style={{'margin':'30px 0'}}>Top dishes near you</h2>
        <div className={styles.container}>
            {foodList.map((item,index)=>{
                if(category === "All" || category === item.category)
                  return <FoodItem key = {index} id = {item._id} name = {item.name} image = {item.image} price = {item.price} description = {item.description} category = {item.category} />
            })}
        </div>
    </div>
  )
}

export default FoodList