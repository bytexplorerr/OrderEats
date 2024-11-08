import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CartIconDispayContext } from '../store/CartIconDisplay';
import styles from "./MyOrders.module.css";
const MyOrders = () => {

    const [orderArr,setOrderArr] = useState([]);

    const {URL,token} = useContext(CartIconDispayContext);
    const getOrdersDetails = async (req,res)=>{
        try
        {
            const response = await axios.post(`${URL}/api/order/myorders`,{},{headers: {
                Authorization: `Bearer ${token}`
            }});
            if(response.data.success)
            {
                setOrderArr(response.data.data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(()=>{
       if(token)
       {
        getOrdersDetails();
       }
    },[token]);

  return (
    <div>
        {orderArr.length === 0 ? (
            <p>No orders found.</p>
        ) : (
            orderArr.map((order) => (
                <section  className={styles.container} key={order._id}>
                    {order.items.map((item)=>{
                        return(
                        <aside className={styles.order} key = {item._id}>
                            <div>
                                <img src={`${URL}/images/${item.image}`} alt="food_image" className={styles.food_image} />
                            </div>
                            <div className={styles.priceinfo}>
                                <p>Name: {item.name}</p>
                                <p>Price: {item.price}$</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </aside>
                        )
                    })}

                    <div className={styles.tracker}>
                        <p><span>&#x25cf;</span> {order.status}</p>
                        <button onClick={getOrdersDetails}>Track Order</button>
                    </div>
                </section>
            ))
        )}
    </div>
  )
}

export default MyOrders