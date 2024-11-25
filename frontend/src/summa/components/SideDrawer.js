import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getCartTotalQuantity } from '../features/slice/cartSlice';

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];
  const totalQuantity = useSelector(getCartTotalQuantity)

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer-links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className='fas fa-shopping-cart'></i>
            <span>
              Cart
              <span className='sidedrawer-cartbadge'>{totalQuantity}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideDrawer