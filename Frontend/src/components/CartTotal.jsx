import React from 'react'
import { CartIconDispayContext } from '../store/CartIconDisplay';
import { useContext ,useState ,useEffect} from 'react';
import styles from "./CartTotal.module.css";    
const CartTotal = () => {
    const {foodDetails} = useContext(CartIconDispayContext);
    const [totalPrice,setTotalPrice] = useState(0);
    useEffect(() => {
        const calculatedTotal = foodDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(calculatedTotal);
    }, [foodDetails]);
  return (
    <table className={styles.total}>
        <thead>
        <tr>
          <th><h2>Cart Totals</h2></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Subtotal</td>
          <td>${totalPrice}</td>
        </tr>
        <tr>
          <td>Delivery Fee</td>
          <td>$5</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>${totalPrice + 5}</td>
        </tr>
        </tbody>
    </table>
  )
}

export default CartTotal