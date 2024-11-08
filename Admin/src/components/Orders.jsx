import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import styles from "./Order.module.css";

const Orders = () => {

  const [orderArr,setOrderArr] = useState([]);
  const URL = "http://localhost:8080";

  const statusHandler = async(event,orderId)=>{
    try
    {
      const response = await axios.post(`${URL}/api/order/update-status`,{
        orderID:orderId,
        status:event.target.value
      });
      if(response.data.success)
      {
        toast.success("Status Changed Successfully!");
        await listOrders();
      }
      else
      {
        toast.success("Error!");
      }
    }
    catch(err)
    {
      console.log(err);
      toast.error("Error!");
    }
  }

  const listOrders = async(req,res)=>{
    try
    {
      const response = await axios.get(`${URL}/api/order/listorders`);
      if(response.data.success)
      {
        setOrderArr(response.data.data);
      }
      else
      {
        toast.error("Error!");
      }
    }
    catch(err)
    {
      toast.error("Error!");
      console.log(err);
    }
  }

  useEffect(()=>{
    listOrders();
  },[]);

  return (
    <section className={styles.ordersection}>
      {orderArr.map((order)=>(
        <aside key = {order._id} className={styles.ordercontainer}>
          <div>
          <img src = {assets.parcel_icon} alt = "parcel_icon"></img>
          </div>
          <div>
              <p>
                {order.items.map((item,index)=>{
                  if(index === orderArr.length - 1)
                  {
                    return item.name + " x " + item.quantity; 
                  }
                  else
                  {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p style={{marginTop:'10px'}}>{order.address.firstName + " " + order.address.lastName}</p>
              <p>{order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>

            <p>Amount : {order.amount} $</p>

            <select onChange={(event)=>statusHandler(event,order._id)} value = {order.status}>
              <option value = "Food Processing">Food Processing</option>
              <option value = "Out for Delivery">Out for Delivery</option>
              <option value = "Delivered">Delivered</option>
            </select>
        </aside>
      ))}
    </section>
  )
}

export default Orders