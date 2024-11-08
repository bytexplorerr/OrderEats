import React, { useState } from 'react'
import styles from "./Menu.module.css"
import { menu_list } from '../assets/assets'
import MenuItemSlider from './MenuItemSlider'
const Menu = () => {
  return (
    <div>
        <div className={styles.content}>
            <h2>Explore Our Menu</h2>
            <p>Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your carvings and elevate 
                your dining experience, one delicious meal at a time.
            </p>
        </div>
        <div className={styles.item}>
            {menu_list.map((item,index)=>{
                return <MenuItemSlider image = {item.menu_image} name = {item.menu_name} key = {index} />
            })}
        </div>
        <hr/>
    </div>
  )
}

export default Menu