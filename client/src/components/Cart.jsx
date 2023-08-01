import { useEffect, useState } from 'react'
import Item from './sub-components/Item'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function Cart ({verifiedUserInfo, userCart, updateUserCart, toggleChime}) {
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

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

    function handleCheckout () {
        userAxios.post(`/api/protected/orders/user`)
        .then(res => {
            toggleChime()
            navigate('orders')
        })
    }
    
    return (
        <div className="interior-cart-wrapper">
            {cartItemElements.length === 0 ?
            <>
            <div className="empty-cart-message">Cart is empty.</div>
            <div className="empty-cart-message small-message">Cart is empty. Scroll down to browse!</div>
            </>
            :
            <>
            {cartItemElements}
            <div className="cart-total">
                <div className="cart-total-text">
                    Cart Total: <b className="bolded-total">${totalCost.toFixed(2)}</b> 
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
            </>
            }
        </div>
    )
}