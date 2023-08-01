import { useEffect, useState, useRef } from 'react'
import Cart from './Cart'
import Categories from './Categories'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import { set } from 'mongoose';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function NavPage ({verifiedUserInfo, designateVUI, toggleChime}) {
    const {userID} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [userCart, setUserCart] = useState([]);
    function updateUserCart(update, replace = false) {
        if (replace) {
            setUserCart(update)
        } else {
            setUserCart(prev => [
                ...prev,
                ...update
            ])
        }
    }

    useEffect(() => {
        if (location.pathname.includes('navigation') && verifiedUserInfo._id != userID) {
            userAxios.get(`/api/protected/users/orders/${userID}`)
                .then(res => designateVUI(res.data))
        }
        userAxios.get(`/api/protected/cart`)
            .then(res => setUserCart(res.data))
    }, [verifiedUserInfo._id])


    return (
        <div className="navpage-wrapper main">
            <div className="cart-signout-bar content-bearing">
                <div className="in-cart-block-button-wrapper">
                    <button
                        type="button"
                        className="signin-button sign-out in-cart-block"
                        onClick={() => {
                            Swal.fire({
                                icon: "success",
                                title: "Successfully signed out.",
                                confirmButtonText: "OK"
                            })
                            designateVUI({})
                            localStorage.removeItem('user')
                            localStorage.removeItem('token')
                            navigate('/')
                        }}
                    >
                        Sign Out
                    </button>
                    
                </div>
                <div className="in-cart-block-button-wrapper">
                    <button className="signin-button sign-out in-cart-block" onClick={() => navigate('orders')}>
                        View Previous Orders
                    </button>
                </div>
                <div className="in-cart-block-button-wrapper">
                    <div className="cart-wrapper">
                        <span className="cart-title">{verifiedUserInfo.username}'s Cart</span>
                        <Cart
                            verifiedUserInfo={verifiedUserInfo}
                            userCart={userCart}
                            updateUserCart={updateUserCart}
                            toggleChime={toggleChime}
                        />
                    </div>
                </div>
                
            </div>
            <div className="central-content">
                <Categories 
                    userCart={userCart}
                    verifiedUserInfo={verifiedUserInfo}
                    updateUserCart={updateUserCart}
                />
            </div>
        </div>
    )
}