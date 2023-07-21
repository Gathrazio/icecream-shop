import { useEffect, useState } from 'react'
import Item from './sub-components/Item'

export default function Cart ({verifiedUserInfo, userCart, updateUserCart}) {
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (userCart.length != 0) {
            setTotalCost(userCart.reduce((currentTotal, item) => item.price * item.users[item.users.findIndex(lightUser => lightUser.userID === verifiedUserInfo._id)].quantity + currentTotal, 0))
        }
    }, [userCart])
    
    const cartItemElements = userCart.map((item, itemIndex) => {
        const orderIndex = item.users.findIndex(lightUser => lightUser.userID === verifiedUserInfo._id)
        return <Item
                    key={item._id}
                    item={{...item, itemIndex}}
                    orderIndex={orderIndex}
                    verifiedUserInfo={verifiedUserInfo}
                    userCart={userCart}
                    updateUserCart={updateUserCart}
                />
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
                    Cart Total: <b className="bolded-total">${totalCost.toFixed(2)}</b> 
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
            </>
            }
        </div>
    )
}