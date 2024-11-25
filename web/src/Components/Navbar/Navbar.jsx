import './Navbar.css'
import { useState } from 'react';
import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const[menu, setMenu] = useState("order");
  return (
    <div className='navbar'>
        <img src={logo} alt="" id="logo" />
        <ul className="navbar-menu">
            <li onClick={()=>{setMenu("order")}}><Link style={{textDecoration: 'none'}} to='/'>Order</Link>{menu === "home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("addMaterials")}}><Link style={{textDecoration: 'none'}} to='/addMaterials'>AddMaterials</Link>{menu === "products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("materials")}}><Link style={{textDecoration: 'none'}} to='/materials'>Materials</Link>{menu === "aboutUs"?<hr/>:<></>}</li>
        </ul>
        <div class="navbar-right">
            <img src={profile} alt="" className="search" />
        </div>
    </div>
    
  )
}

export default Navbar