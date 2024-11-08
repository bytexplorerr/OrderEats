import React, { useRef } from 'react'
import styles from "./ForgotPass.module.css";
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CartIconDispayContext } from '../store/CartIconDisplay';
const ForgotPass = () => {
    const email = useRef(null);
    const navigate = useNavigate();

    const {URL} = useContext(CartIconDispayContext);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try
        {
          const mail = email.current.value;
          const response = await axios.post(`${URL}/api/user/forgot-password`,{
            email:mail,
          });
          if(response.data.message)
          {
            email.current.valye = "";
            toast.success("Email sent successfully!");
            navigate("/login");
          }
        }
        catch(err)
        {
          console.log(err.message);
        }
    }
  return (
    <div className={styles.displayImage}>
        <section className={styles.forgot_password}>
        <div className={styles.div1}>
          <h1>Reset Password</h1>
        </div>
        <form className={styles.div2} onSubmit={handleSubmit}>
          <input type = 'email' placeholder='Enter e-mail' required ref = {email}></input>
          <button type = "submit">Send Reset Mail</button>
        </form>
      </section>
    </div>
  )
}

export default ForgotPass