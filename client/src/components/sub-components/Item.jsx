import { useState } from 'react'

export default function Item (props) {
    const info = props.info;
    const [editToggle, setEditToggle] = useState(true);
    const [currentQuantity, setCurrentQuantity] = useState(info.users[props.orderIndex].quantity)
    function handleSubmit (e) {
        e.preventDefault()
        setEditToggle(prev => !prev)
        const updatedUsersArr = info.users.map(user => {
            return user.userID === props.thisUser._id ? 
            {
                userID: user.userID,
                quantity: currentQuantity
            }
            :
            user
        })
        axios.put(`/api/items/${info._id}`, { users: updatedUsersArr })
            .then(res => props.reloadUserCart())
    }
    function handleQuantityInputChange (e) {
        const {value} = e.target;
        setCurrentQuantity(value)
    }
    function handleDelete (e) {
        e.preventDefault()
        props.popItem(info._id)
        const indexToRemove = info.users.findIndex(user => user.userID === props.thisUser._id);
        const updatedUsersArr = info.users.toSpliced(indexToRemove, 1)
        axios.put(`/api/items/${info._id}`, { users: updatedUsersArr })
            .then(res => console.log(res.data))
            .then(() => window.location.reload())
    }
    return (
        <div className="item-wrapper">
            <h2 className="cart-item-title">{info.title}</h2>
            <div className="misc-info-wrapper">
                <form name="item-edit-form" className="barabara" onSubmit={handleSubmit}>
                    <div className="ppu">Price: ${info.price}</div>
                    { editToggle ? 
                    <div className="quan">Quantity: {currentQuantity}</div>
                    :
                    <div className="cart-quantity-edit-wrapper">
                        <div className="quan-edit">Quantity:</div>
                        <input name="quantity" className="cart-quantity-input" type="number" min="1" step="1" onChange={handleQuantityInputChange} value={currentQuantity}/>
                    </div>
                    }
                    <div className="item-button-wrapper">
                        { editToggle ?
                        <div className="clickable item-button-clickable" onClick={() => setEditToggle(prev => !prev)}>
                            <button type="button" className="item-button">Edit</button>
                        </div>
                        :
                        <button className="item-button">Save</button>
                        }
                        <div className="clickable item-button-clickable" onClick={handleDelete}>
                            <button type="button" className="item-button right-button">Delete</button>
                        </div>
                    </div>
               </form>
            </div>
            
        </div>
    )
}