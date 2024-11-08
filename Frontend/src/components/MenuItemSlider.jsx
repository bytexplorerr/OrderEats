import React, { useContext } from 'react'
import { ActiveMenuContext } from '../store/ActiveMenu'
import styles from "./Menu.module.css";
const MenuItemSlider = ({image,name}) => {
    const {category,setCategory} = useContext(ActiveMenuContext);
  return (
    <div>
        <img src = {image} alt = "food_image" onClick={()=>setCategory(prev=> prev!==name?name:"All")} className={category===name?styles.active:""}></img>
        <p>{name}</p>
    </div>
  )
}

export default MenuItemSlider