import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ActiveMenuContextProvider } from './store/ActiveMenu.jsx'
import {ActivePageContextProvider } from './store/ActivePage.jsx'
import { CartIconDispayContextProvider } from './store/CartIconDisplay.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartIconDispayContextProvider>
    <ActivePageContextProvider>
    <ActiveMenuContextProvider>
        <App />
    </ActiveMenuContextProvider>
  </ActivePageContextProvider>,
  </CartIconDispayContextProvider>
)
