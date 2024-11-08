import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import styles from "./Profile.module.css"
import { Link } from 'react-router-dom'
import { ActivePageContext } from '../store/ActivePage'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const [dropdown,setDropDown] = useState(false);
    const {setToken} = useContext(ActivePageContext);

    const nevigate = useNavigate();

    const handleClick = ()=>{
        setDropDown(prev => !prev);
    };

    const handleLogout = ()=>{   
        localStorage.removeItem("token");
        setToken("");
        toast.success("Logout Sucessfully!"); 
    }
  return (
    <section>
        <div>
        <img src = {assets.profile_icon} alt = "profile_icon" className={styles.profile_icon} onClick={handleClick}></img>
        </div>
        {dropdown && <ul className={styles.dropdown}>
            <li onClick={()=>{nevigate("/myorders")}}>
                <img src = {assets.bag_icon} alt = "bag_icon"></img>
                <p>My Orders</p>
            </li>
            <hr />
            <li onClick={handleLogout}>
                <img src = {assets.logout_icon} alt = "logout_icon"></img>
                <p>Logout</p>
            </li>
        </ul>}
    </section>
  )
}

export default Profile