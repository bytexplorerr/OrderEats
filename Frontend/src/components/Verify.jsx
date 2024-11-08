import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import styles from './Verify.module.css';
import { CartIconDispayContext } from '../store/CartIconDisplay';
import axios from 'axios';
const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {URL} = useContext(CartIconDispayContext);
    const nevigate = useNavigate();

    const verifyOrder = async(req,res)=>{
        const response = await axios.post(`${URL}/api/order/verify`,{
            success,
            orderId
        });

        if(response.data.success)
        {
            toast.success("Order Placed Successfully!");
            nevigate("/myorders");
        }
        else
        {
            toast.error("Order Canceled!");
            nevigate("/");
        }
    };

    useEffect(()=>{
        verifyOrder();
    },[]);

  return (
    <div className={styles.verify}>
        <div className={styles.spinner}></div>
    </div>
  )
}

export default Verify