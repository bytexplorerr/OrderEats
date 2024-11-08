import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import styles from "./Footer.module.css"
import { ActivePageContext } from '../store/ActivePage'
const Footer = () => {
    const {setACtiveLink} = useContext(ActivePageContext);
  return (
    <div className={styles.container}>
        <footer className={styles.footer}>
            <div className={styles.section1}>
            <h1>OrderEats</h1>
            <p>Bringing you the best meals from top local restaurants right to your door. 
                Our mission is to make your dining experience seamless and enjoyable.</p>
                <div className={styles.symbol}>
                    <img src  = {assets.facebook_icon} alt = "facebook_icon" />
                    <img src = {assets.twitter_icon} alt = "twitter_icon" />
                    <img src = {assets.linkedin_icon} alt = "linkedin_icon" />
                </div>
            </div>
            <div>
                <h2>Company</h2>
                <Link to = "/" className={styles.company_links} onClick={()=>setACtiveLink("Home")}>Home</Link>
                <Link to = "/about-us" className={styles.company_links}>About Us</Link>
                <Link to = "/delivery"className={styles.company_links}>Delivery</Link>
                <Link to = "/privacy-policy" className={styles.company_links}>Privacy Policy</Link>
            </div>
            <div>
                <h2>Get in touch</h2>
                <p>+1-212-456-7890</p>
                <a href={`mailto:'contact@ordereats.com`} className={styles.company_links}>contact@ordereats.com</a>
            </div>
        </footer>
        <hr />
        <p style={{'margin':'10px'}}>Copyright 2024 © - All Rights Reserved.</p>
    </div>
  )
}

export default Footer