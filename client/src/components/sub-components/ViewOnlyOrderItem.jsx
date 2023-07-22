
export default function ViewOnlyOrderItem ({item, verifiedUserInfo}) {
    // const thisItem = await item;
    console.log(item.users)
    const quantity = item.users.find(user => user.userID === verifiedUserInfo._id).quantity;
    return (
        <div className="catitem-wrapper order-item-wrapper-h">
            <h3 className="catitem-title">{item.title}</h3>
            <img src={item.imgUrl} className="catitem-image" />
            <div className="catitem-input-button-wrapper">
                Quantity: {quantity}
            </div>       
            <div className="catitem-ppi">Price per item: ${item.price}</div>
        </div>
    )
}