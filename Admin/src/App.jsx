import Navbar from "./components/Navbar"
import {Route , BrowserRouter as Router , Routes} from "react-router-dom"
import AddItems from "./components/AddItems"
import ListItems from "./components/ListItems"
import Orders from "./components/Orders"
import Sidebar from "./components/Sidebar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className = "app">
          <Sidebar />
          <Routes>
            <Route path = "/add_items" element = {<AddItems></AddItems>}></Route>
            <Route path = "/list_items" element = {<ListItems></ListItems>}></Route>
            <Route path = "/orders" element = {<Orders></Orders>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App