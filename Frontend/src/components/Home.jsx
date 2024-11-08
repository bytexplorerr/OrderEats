import React, { useState } from 'react'
import Header from './Header'
import Menu from './Menu'
import FoodList from './foodList'
import DownloadApp from './DownloadApp'
const Home = () => {
  return (
    <>
    <Header></Header>
    <Menu></Menu>
    <FoodList></FoodList>
    <DownloadApp></DownloadApp>
    </>
  )
}

export default Home