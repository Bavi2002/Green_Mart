import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, decreaseCart } from '../features/slice/cartSlice'

const CartItem = ({ item, removeHandler }) => {
    const dispatch = useDispatch()
    const decreaseHandler = (item) => {
        dispatch(decreaseCart(item))
    }
    const increaseHandler = (item) => {
        dispatch(addToCart(item))
    }
    return (
        <div className='cartitem'>
            <div className="cartitem-image">
                <img src={item.imageUrl} alt={item.name} />
            </div>
            <Link to={`/product/${item._id}`} className="cartitem_name">
                <p>{item.name}</p>
            </Link>

            <p className="cartitem_price">${item.price * item.cartQuantity}</p>
            <div className='cartitem-quantity'>
                <button onClick={() => decreaseHandler(item)}>-</button>
                <span>{item.cartQuantity}</span>
                <button onClick={() => increaseHandler(item)}>+</button>
            </div>
            <button className='cartitem-delete' onClick={() => removeHandler(item)}>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    )
}

export default CartItem