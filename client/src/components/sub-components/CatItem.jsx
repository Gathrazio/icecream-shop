import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../userContext.jsx'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function CatItem (props) {
    const [inputValue, setInputValue] = useState(1);
    const location = useLocation()
    const userID = location.pathname.slice(12);
    const navigate = useNavigate();

    function handleChange (e) {
        const {value} = e.target;
        setInputValue(value)
    }

    function handleSubmit (e) {
        const writable = [...props.itemInfo.users];
        writable.push({
            userID: userID,
            quantity: inputValue
        })
        e.preventDefault()
        axios.put(`/api/items/${props.itemInfo._id}`, {
            users: writable
        })
            .then(res => console.log(res.data))
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "The item(s) have been added to your cart!",
                    confirmButtonText: "OK"
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            window.location.reload()
                        }
                    })
            })
    }

    const displayToggle = props.itemInfo.users.findIndex(user => user.userID === userID) != -1;

    return (
        <div className="catitem-wrapper">
            <h3 className="catitem-title">{props.itemInfo.title}</h3>
            <img src={props.itemInfo.imgUrl} className="catitem-image" />
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
            
            <div className="catitem-ppi">Price per item: ${props.itemInfo.price}</div>
        </div>
    )
}