import { useContext, useEffect, useState } from 'react'
import Item from './sub-components/Item'

export default function Cart (props) {
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        if (props.currentUserCart.length != 0) {
            setTotalCost(props.currentUserCart.reduce((currentTotal, item) => item.price * item.users[item.users.findIndex(lightUser => lightUser.userID === props.userID)].quantity + currentTotal, 0))
        }
    }, [props.currentUserCart])
    
    const cartItemElements = props.currentUserCart.map(item => {
        const orderIndex = item.users.findIndex(lightUser => lightUser.userID === props.userID)
        return <Item key={item._id} info={item} orderIndex={orderIndex} thisUser={props.currentUser} popItem={props.popItem} reloadUserCart={props.reloadUserCart} currentCart={props.currentUserCart}/>
    })
    
    return (
        <div className="interior-cart-wrapper">
            {cartItemElements.length === 0 ?
            <div className="empty-cart-message">Cart is empty.</div>
            :
            <>
            {cartItemElements}
            <hr />
            <div className="cart-total">
                <div className="cart-total-text">
                    Cart Total: <b className="bolded-total">${totalCost}</b> 
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
            </>
            }
        </div>
    )
}