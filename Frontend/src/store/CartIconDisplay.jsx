import { createContext , useEffect, useState } from "react";
import axios from "axios";
export const CartIconDispayContext = createContext();

export const CartIconDispayContextProvider = ({children})=>{
    const [displayCart,setDisplayCart] = useState(false);
    const [cartArr,setCartArr] = useState([]);
    const [foodDetails, setFoodDetails] = useState([]);
    const token = localStorage.getItem("token");
    const URL = "http://localhost:8080";

    const getFood = async (arr) => {
        try 
        {
            const ids = arr.map(item => item.id);
            const response = await axios.post(`${URL}/api/food/cart-items`, { ids });
            if (response.data.success) {
                let data = response.data.items;
                const newArr = data.map((item)=>{
                    const cartItem = arr.find((cart)=> cart.id === item._id);
                    if(cartItem)
                        return {...item,quantity:cartItem.quantity};
                    return item;
                });
                setFoodDetails(newArr);
                if(newArr.length > 0)
                    setDisplayCart(true);
                else
                    setDisplayCart(false);
            } 
        } 
        catch (err) 
        {
            setDisplayCart(false);
            console.error(err.message);
        }
    }

    const fetchCartList = async ()=> {
        try
        {
            const response = await axios.get(`${URL}/api/cart/get`,{headers:{authorization: `Bearer ${token}`}});
            if(response.data.success)
            {
                let data = response.data.cartData;
                let arr = Object.entries(data).map(([key, value]) => ({
                id: key,
                quantity: value
                }));
                setCartArr(arr);
                if(arr.length > 0)
                    getFood(arr);
                else
                {
                    setDisplayCart(false);
                    setFoodDetails([]);
                }
            }
            else
                setDisplayCart(false);
        }
        catch(err)
        {
            setDisplayCart(false);
            console.log(err.message);
        }
    };

    useEffect(()=>{
        if(token)
            fetchCartList();
    },[token]);
    const value = {
        displayCart,
        setDisplayCart,
        cartArr,
        foodDetails,
        fetchCartList,
        token,
        URL
    }
    return(
        <CartIconDispayContext.Provider value = {value}>
            {children}
        </CartIconDispayContext.Provider>
    )
}