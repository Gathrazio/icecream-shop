import { useState, useEffect }  from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Order from './sub-components/Order'
import axios from 'axios'
import leftArrow from '../assets/left-arrow.png'

export default function Orders ({verifiedUserInfo, designateVUI, updateOrdersChime}) {
    const {userID} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (location.pathname.includes('navigation') && verifiedUserInfo._id != userID) {
            axios.get(`/api/users/${userID}`)
                .then(res => designateVUI(res.data))
        }
        axios.get(`/api/orders/user/${userID}`)
            .then(res => setOrders(res.data))
    }, [verifiedUserInfo._id])

    const orderElements = orders.map(order => <Order key={order._id} order={order} verifiedUserInfo={verifiedUserInfo}/>)

    
    return (
        <div className="orders-wrapper main">
            <div className="categorynav-wrapper">
                <img className="order-nav-back" src={leftArrow} onClick={() => navigate(-1)}/>
                <div className="orders-title">
                    <h2>Orders</h2>
                </div>
            </div>
            {orderElements.length === 0 ? 
            <div className="orders-block-message">
                You have no previous orders.
            </div>
            :
            <div className="orders-block content-bearing">
                {orderElements}
            </div>
            }
            
            
        </div>
    )
}