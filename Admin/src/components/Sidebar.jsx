import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import styles from "./Sidebar.module.css"
const Sidebar = () => {
  return (
    <aside className={styles.sidebarAside}>
        <Link to = "/add_items" className={styles.link}>
        <img src = {assets.add_icon} alt = "add_icon"></img>
        <span>Add Item</span>
        </Link>

        <Link to = "/list_items" className={styles.link}>
        <img src = {assets.order_icon} alt = "order_icon"></img>
        <span>List Items</span>
        </Link>

        <Link to = "/orders" className={styles.link}>
        <img src = {assets.order_icon} alt = "order_icon"></img>
        <span>Order</span>
        </Link>
    </aside>
  )
}

export default Sidebar