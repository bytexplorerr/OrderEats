import React, { useContext, useEffect, useRef} from 'react'
import styles from "./Login.module.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ActivePageContext } from '../store/ActivePage';
import { CartIconDispayContext } from '../store/CartIconDisplay';
import axios from "axios";
import { toast } from 'react-toastify';
const Login = ({setLogedIn}) => {

    const {activeLink,setActiveLink,setToken} = useContext(ActivePageContext);
    const {URL} = useContext(CartIconDispayContext);
    const email = useRef(null);
    const password = useRef(null);
    useEffect(()=>{
      setActiveLink("Other");
    },[]);
    const nevigate = useNavigate();

    const setTokenWithExpiry = (token)=>{
      const date = new Date();
      const expiryTime = date.getTime() + (7 * 24 * 60* 60 * 1000); // after 7 days user will logout automatically

      const tokenData = {
        token:token,
        expiry:expiryTime
      };
      localStorage.setItem("token",JSON.stringify(tokenData));
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try
        {
          const response = await axios.post(`${URL}/api/user/login`,{
              email:email.current.value,
            password:password.current.value
          });
          if(response.data.success)
          {
            setToken(response.data.token);
            setTokenWithExpiry(response.data.token)
            setLogedIn(true);
            nevigate("/");
            toast.success("Login Sucessfully!");
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
        <section className={styles.login}>
        <div className={styles.div1}>
          <h1>Log in</h1>
        </div>
        <form className={styles.div2} onSubmit={handleSubmit}>
          <input type = 'email' placeholder='Enter e-mail' required ref = {email}></input>
          <input type='password' placeholder='Enter Password' required ref = {password}></input>
          <button type = "submit">Login</button>
        </form>
        <Link to = "/forgot-password" className={styles.forgot_password}>Forgot Password ?</Link>
        <div>
          <span style={{'fontSize':'0.8rem'}}>Create a new account? </span> 
          <Link to ="/signup" className={styles.signupLink}>Click here</Link>
        </div>
      </section>
    </div>
  )
}

export default Login