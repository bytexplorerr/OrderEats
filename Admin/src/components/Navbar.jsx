import React from 'react'
import {assets} from "../assets/assets"
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav>
        <div className={styles.div1}>
            <Link to = "/" className={styles.webname}>OrderEats</Link>
            <p>Admin Panel</p>
        </div>
        <div>
            <img src = {assets.profile_image} alt = "profile_icon"></img>
        </div>
    </nav>
  )
}

export default Navbar