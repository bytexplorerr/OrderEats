import React, { useContext, useEffect, useRef } from 'react'
import styles from "./Signup.module.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ActivePageContext } from '../store/ActivePage';
import { CartIconDispayContext } from '../store/CartIconDisplay';
import axios from "axios";
import { toast } from 'react-toastify';
const Signup = () => {

  const {activeLink,setActiveLink,setToken} = useContext(ActivePageContext);
  const {URL} = useContext(CartIconDispayContext);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const setTokenWithExpiry = (token)=>{
  const date = new Date();
  const expiryTime = date.getTime() + (7 * 24 * 60* 60 * 1000); // after 7 days user will logout automatically

  const tokenData = {
    token:token,
    expiry:expiryTime
  };
  localStorage.setItem("token",JSON.stringify(tokenData));
}

  useEffect(()=>{
    setActiveLink("Other");
  },[]);

  const navigate = useNavigate();

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try
    {
      const response = await axios.post(`${URL}/api/user/register`,{
        name:name.current.value,
        email:email.current.value,
        password:password.current.value
      });
      if(response.data.success)
      {
        setToken(response.data.token);
        setTokenWithExpiry(response.data.token);
        navigate("/");
        toast.success("User Registered Sucessfully!");
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
      }
      else
      {
        toast.error(response.data.message);
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div className={styles.displayImage}>
        <section className={styles.signup}>
        <div className={styles.div1}>
          <h1>Sign Up</h1>
        </div>
        <form className={styles.div2} onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Your Name' required ref = {name}></input>
          <input type = 'email' placeholder='Enter Your e-mail' required ref = {email} ></input>
          <input type='password' placeholder='Enter Password' required ref = {password}></input>
          <button type = "submit">Create Account</button>
          <div>
          <input type = "checkbox" required></input>
          <span style={{'fontSize':'0.8rem'}}>By continuing,i agree to the terms of use & privacy policy.</span>
          </div>
        </form>
        <div>
          <span style={{'fontSize':'0.8rem'}}>Already have an account ? </span> 
          <Link to ="/login" className={styles.loginLink}>Login here</Link>
        </div>
      </section>
    </div>
  )
}

export default Signup