import React from 'react'
import { assets } from '../assets/assets'
import styles from "./DownloadApp.module.css"
const DownloadApp = () => {
  return (
    <div className={styles.container}>
        <h1>For Better Experience Download</h1>
        <div className={styles.appName}>
            <h1>OrderEats</h1>
            <h2>App</h2>
        </div>
        <div className={styles.icons}>
            <img src = {assets.play_store} alt = "playstore_icon" />
            <img src = {assets.app_store} alt = "appstore_icon" />
        </div>
    </div>
  )
}

export default DownloadApp