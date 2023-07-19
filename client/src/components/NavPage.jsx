import { UserContext } from './userContext.jsx'
import { useContext, useEffect, useState } from 'react'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function NavPage (props) {
    const {userID} = useParams();
    
    const navigate2 = useNavigate();
    
    const { verifiedUserInfo, userCart, reloadTrigger } = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(verifiedUserInfo);
    const [currentUserCart, setCurrentUserCart] = useState(userCart)

    function popItem (itemID) {
        const cartIndex = currentUserCart.findIndex(item => item._id === itemID)
        setCurrentUserCart(prev => prev.toSpliced(cartIndex, 1))
    }

    useEffect(() => {
            axios.get(`/api/users/${userID}`)
                .then(res => setCurrentUser(res.data))
            axios.get(`/api/cart/${userID}`)
                .then(res => setCurrentUserCart(res.data))
        }, [reloadTrigger])

    function reloadUserCart () {
        axios.get(`/api/cart/${userID}`)
                .then(res => setCurrentUserCart(res.data))
    }


    return (
        <div className="navpage-wrapper main">
            <div className="cart-signout-bar content-bearing">
                <div className="in-cart-block-button-wrapper">
                    <button type="button" className="signin-button in-cart-block" onClick={() => {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully signed out.",
                            confirmButtonText: "OK"
                        })
                        navigate2('/')
                    }}>Sign Out</button>
                </div>
                <div className="in-cart-block-button-wrapper">
                    <div className="cart-wrapper">
                        <h3 className="cart-title">{currentUser.firstName}'s Cart</h3>
                        <hr />
                        <Cart currentUser={currentUser} currentUserCart={currentUserCart} userID={userID} reloadUserCart={reloadUserCart} popItem={popItem}/>
                    </div>
                </div>
                
            </div>
            <div className="central-content">{props.children}</div>
        </div>
    )
}