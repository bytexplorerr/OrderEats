import React, { useContext } from 'react'
import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import { ActivePageContext } from '../store/ActivePage';
const Header = () => {
  const {setActiveLink} = useContext(ActivePageContext); 
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h2>Order your favourite food here</h2>
            <p>Choose a diverse menu featuring a delectable array of dishes crafted with the finest 
                ingredients and culinary expertise. Our mission is to satisfy your carvings and elevate your dining experience,
                one delicious meal at a time.
            </p>
            <Link to = "/menu" className={styles.menu} onClick={()=>setActiveLink("Menu")}>View Menu</Link>
        </div>
    </div>
  )
}

export default Header