import { useState } from 'react'

    // props that <Item /> receives

    // key={item._id}
    // item={item}
    // orderIndex={orderIndex}
    // verifiedUserInfo={verifiedUserInfo}
    // userCart={userCart}
    // updateUserCart={updateUserCart}

export default function Item (props) {
    const thisItem = props.item;
    const orderIndex = props.orderIndex;
    const userCart = props.userCart;
    const updateUserCart = props.updateUserCart;
    const verifiedUserInfo = props.verifiedUserInfo;

    const [editToggle, setEditToggle] = useState(true);
    const [currentQuantity, setCurrentQuantity] = useState(thisItem.users[orderIndex].quantity);

    function removeItemFromCart () {
        const cartIndex = userCart.findIndex(item => item._id === thisItem._id)
        updateUserCart(userCart.toSpliced(cartIndex, 1), true)
    }

    function handleSubmit (e) {
        e.preventDefault()
        setEditToggle(prev => !prev)

        updateUserCart(userCart.toSpliced(thisItem.itemIndex, 1,
            {
                ...thisItem,
                users: thisItem.users.toSpliced(thisItem.users.findIndex(user => user.userID === verifiedUserInfo._id), 1, {userID: verifiedUserInfo._id, quantity: currentQuantity})
            }
        ), true)
        const updatedUsersArr = thisItem.users.map(user => {
            return user.userID === verifiedUserInfo._id ? 
            {
                userID: verifiedUserInfo._id,
                quantity: currentQuantity
            }
            :
            user
        })
        axios.put(`/api/items/${thisItem._id}`, { users: updatedUsersArr })
    }

    function handleQuantityInputChange (e) {
        const {value} = e.target;
        setCurrentQuantity(value)
    }

    function handleDelete (e) {
        e.preventDefault()
        removeItemFromCart()
        const updatedUsersArr = thisItem.users.toSpliced(orderIndex, 1)
        axios.put(`/api/items/${thisItem._id}`, { users: updatedUsersArr })
    }
    
    return (
        <div className="item-wrapper">
            <h2 className="cart-item-title">{thisItem.title}</h2>
            <div className="misc-info-wrapper">
                <form name="item-edit-form" className="barabara" onSubmit={handleSubmit}>
                    <div className="ppu">Price: ${thisItem.price}</div>
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