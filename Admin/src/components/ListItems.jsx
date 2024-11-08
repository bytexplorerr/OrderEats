import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { toast  } from "react-toastify"
import { assets } from "../assets/assets"
import styles from "./ListItems.module.css"
const ListItems = () => {
  const [list,setList] = useState([]);

  const fetchList = async ()=>{
    try
    {
      const URL = "http://localhost:8080";
      const response = await axios.get(`${URL}/api/food/list`);
      if(response.data.sucess)
      {
        setList(response.data.data);
      }
      else
      {
        toast.error("Error!!");
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleRemove = async (id)=>{
    try
    {
      const URL = "http://localhost:8080";
      const response = await axios.delete(`${URL}/api/food/delete`,{
        data:{id:id},
      });
      await fetchList();
      if(response.data.sucess)
      {
        toast.success(response.data.message);
      }
      else
      {
        toast.error(response.data.message)
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchList();
  },[]);
  return (
    <section className={styles.list}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item)=>{
            return(
              <tr key = {item._id}>
                <td>
                  <img src = {`http://localhost:8080/images/${item.image}`} alt = "foodItem_image" className={styles.food_item}></img>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <img src = {assets.cross_icon} alt = "cross_icon" className={styles.cross_icon} onClick={()=>handleRemove(item._id)}></img>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default ListItems