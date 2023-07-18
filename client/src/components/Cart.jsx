import { CartContext } from '../cartContext.jsx'
import { UserContext } from './userContext.jsx'
import { useContext } from 'react'

export default function Cart () {
    const userContext = useContext(UserContext);
    const { userCart } = useContext(CartContext);
    console.log("user cart", userCart)
    console.log("usercontext: ", userContext)

    return (
        <div className="cart-wrapper">
            cart!
        </div>
    )
}