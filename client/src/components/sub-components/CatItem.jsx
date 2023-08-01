import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

    // props for <CatItem />

    // key={item._id}
    // item={item}
    // userCart={userCart}
    // updateUserCart={updateUserCart}

export default function CatItem ({catItem, userCart, updateUserCart, verifiedUserInfo}) {


    const [inputValue, setInputValue] = useState(1);

    function handleChange (e) {
        const {value} = e.target;
        setInputValue(value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        const writable = [...catItem.users];
        writable.push({
            userID: verifiedUserInfo._id,
            quantity: inputValue
        })
        axios.put(`/api/items/${catItem._id}`, {
            users: writable
        })
            .then(res => {
                const pushableUserCart = [...userCart];
                pushableUserCart.push(res.data)
                updateUserCart(pushableUserCart, true)
                setInputValue(1)
                { window.innerWidth > '500' &&
                    
                    Swal.fire({
                    icon: "success",
                    title: "The item(s) have been added to your cart!",
                    confirmButtonText: "OK",
                    width: '320px',
                    position: 'center'
                })}
            })
            .catch(err => console.log(err))
    }

    const displayToggle = userCart.findIndex(item => item._id === catItem._id) != -1;

    return (
        <div className="catitem-wrapper">
            <h3 className="catitem-title">{catItem.title}</h3>
            <img src={catItem.imgUrl} className="catitem-image" />
            {!displayToggle ?
            <form className="catitem-input-button-wrapper" onSubmit={handleSubmit}>
                <input type="Number" min="1" step="1" value={inputValue} onChange={handleChange} className="catitem-input" />
                <button className="catitem-add-button">Add to Cart</button>
            </form>
            :
            <div className="catitem-input-button-wrapper no-go">
                Item is already in your cart!
            </div>
            
            }
            
            <div className="catitem-ppi">Price per item: ${catItem.price}</div>
        </div>
    )
}