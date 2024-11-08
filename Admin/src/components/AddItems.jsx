import React from 'react'
import { assets } from '../assets/assets'
import styles from "./AddItem.module.css"
import { useState ,useRef} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
const AddItems = () => {

  const [image,setImage] = useState(false);

  const product_name = useRef(null);
  const product_description = useRef(null);
  const product_category = useRef(null);
  const product_price = useRef(null);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product_name.current.value);
    formData.append('description', product_description.current.value);
    formData.append('category', product_category.current.value);
    formData.append('price', product_price.current.value);
    formData.append('image', image); // Append the image file

    try 
    {
      const URL = "http://localhost:8080";
      const response = await axios.post(`${URL}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });

    if (response.data.sucess) 
    {
      // Reset the form
      product_name.current.value = '';
      product_description.current.value = '';
      product_category.current.value = 'Salad';
      product_price.current.value = '';
      setImage(false);
      toast.success(response.data.message);
    } 
    else 
    {
      toast.error(response.data.message);
    }
    } 
    catch (error)
    {
      console.log("Error:", error);
    }
}

  return (
    <section className = {styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
        <h3>Upload Image</h3>
          <label htmlFor='upload_image'>
            <img src = {image? URL.createObjectURL(image) : assets.upload_area} alt = "upload_image" style={{'cursor':'pointer'}}></img>
          </label>
          <input type = "file" id = "upload_image" hidden required onChange={(e)=>setImage(e.target.files[0])}></input>
        </div>

        <div>
          <h3>Product Name</h3>
          <input type = "text" placeholder='Enter Product Name' ref = {product_name} required></input>
        </div>
        <div>
          <h3>Product Description</h3>
          <textarea rows={5} cols={50} required placeholder='Write Something here' ref = {product_description}></textarea>
        </div>
        <div>
          <h3>Product Category</h3>
          <select name = "product_category" ref={product_category}>
            <option value = "Salad">Salad</option>
            <option value = "Rolls">Rolls</option>
            <option value = "Desserts">Desserts</option>
            <option value = "Sandwich">Sandwich</option>
            <option value = "Cake">Cake</option>
            <option value = "Pure Veg">Pure Veg</option>
            <option value = "Pasta">Pasta</option>
            <option value = "Noodles">Noodles</option>
          </select>
        </div>
        <div>
          <h3>Product Price</h3>
          <input type = "number" placeholder='$25' min = "0" ref = {product_price} required></input>
        </div>
        <button type = "submit">Add Item</button>
      </form>
    </section>
  )
}

export default AddItems