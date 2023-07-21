import { useEffect, useState } from 'react'
import Cart from './Cart'
import Categories from './Categories'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function NavPage ({verifiedUserInfo}) {
    const {userID} = useParams();
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
            axios.get(`/api/cart/${verifiedUserInfo._id}`)
                .then(res => {
                    return setUserCart(res.data)
                })
        }, [])


    return (
        <div className="navpage-wrapper main">
            <div className="cart-signout-bar content-bearing">
                <div className="in-cart-block-button-wrapper">
                    <button
                        type="button"
                        className="signin-button in-cart-block"
                        onClick={() => {
                            Swal.fire({
                                icon: "success",
                                title: "Successfully signed out.",
                                confirmButtonText: "OK"
                            })
                            navigate('/')
                        }}
                    >
                        Sign Out
                    </button>
                </div>
                <div className="in-cart-block-button-wrapper">
                    <div className="cart-wrapper">
                        <h3 className="cart-title">{verifiedUserInfo.firstName}'s Cart</h3>
                        <hr />
                        <Cart
                            verifiedUserInfo={verifiedUserInfo}
                            userCart={userCart}
                            updateUserCart={updateUserCart}
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