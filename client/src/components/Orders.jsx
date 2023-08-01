import { useState, useEffect }  from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Order from './sub-components/Order'
import axios from 'axios'
import leftArrow from '../assets/left-arrow.png'

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function Orders ({verifiedUserInfo, designateVUI, updateOrdersChime}) {
    const {userID} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (location.pathname.includes('navigation') && verifiedUserInfo._id != userID) {
            userAxios.get(`/api/protected/users/orders`)
                .then(res => designateVUI(res.data))
        }
        userAxios.get(`/api/protected/orders/user`)
            .then(res => setOrders(res.data))
    }, [verifiedUserInfo._id])

    const orderElements = orders.map(order => <Order key={order._id} order={order} verifiedUserInfo={verifiedUserInfo}/>)

    
    return (
        <div className="orders-wrapper main-modified">
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