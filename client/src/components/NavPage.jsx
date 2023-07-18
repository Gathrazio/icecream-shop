import { CartContextProvider } from '../cartContext.jsx'
import Cart from './Cart'

export default function NavPage (props) {
    return (
        <div className="navpage-wrapper main">
            <div className="cart-signout-bar">
                <button className="signin-button">Sign Out</button>
                <div className="cart-wrapper">
                    <h3>Someone's Cart</h3>
                    <CartContextProvider>
                        <Cart />
                    </CartContextProvider>
                </div>
            </div>
            <div className="central-content">{props.children}</div>
        </div>
    )
}