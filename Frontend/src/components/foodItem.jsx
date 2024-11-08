import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import styles from "./foodItem.module.css"
import Counter from './Counter'
import { CartIconDispayContext } from '../store/CartIconDisplay'
const FoodItem = ({ id,name,image,price,description,category }) => {
  const [selectItem,setSelectItem] = useState(false);
  const {URL} = useContext(CartIconDispayContext);
  const handleItemAdded = (event)=>{
    setSelectItem(true);
  }

  const [totalItemsCount,setTotalItemsCount] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.figure_container}>
        <img src = {`${URL}/images/${image}`} alt = "food_image" className={styles.figure}/>
        {!selectItem && <img src = {assets.add_icon_white} alt = "add_item" className={styles.add_icon} onClick={handleItemAdded} />}
        {selectItem && <Counter setSelectItem = {setSelectItem} totalItemsCount={totalItemsCount} setTotalItemsCount={setTotalItemsCount} id = {id} name = {name} image = {image} price = {price}/>}
      </div>
      <div className={styles.info}>
        <p>{name}</p>
        <img src = {assets.rating_starts} alt = "rating stars" />
      </div>
      <p>{description}</p>
      <h2>${price}</h2>
    </div>
  )
}

export default FoodItem