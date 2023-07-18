import { CartContext } from '../cartContext.jsx'
import { useContext } from 'react'

export default function Cart () {

    const {userCart} = useContext(CartContext);
    console.log(userCart)

    return (
        <div className="cart-wrapper">
            cart!
        </div>
    )
}