import ViewOnlyOrderItem from "./ViewOnlyOrderItem";
import renderDate from '../../../dateRenderer.js'
import { useState } from 'react'

export default function Order ({order, verifiedUserInfo}) {

    const [detailToggle, setDetailToggle] = useState(false);
    
    const orderTotal = order.items.reduce((currentTotal, item) => item.price * item.users[item.users.findIndex(lightUser => lightUser.userID === verifiedUserInfo._id)].quantity + currentTotal, 0)

    const orderElements = order.items.map(item => <ViewOnlyOrderItem key={item.itemID} item={item} verifiedUserInfo={verifiedUserInfo}/>)

    return (
        <div className="order-wrapper">
            <div className="order-blurb-wrapper">
                <div className="order-title">
                    <button className="order-details" onClick={() => setDetailToggle(prev => !prev)}>{detailToggle ? "Hide Details" : "Details"}</button>
                    <div className="order-info-text-wrapper">
                        <div className="order-info-text-wide">
                            {renderDate(order.createdAt)[0]}
                        </div>
                        <div className="order-info-text-thin">
                            {renderDate(order.createdAt)[1]}
                        </div>
                        <div className="order-info-text">
                            Total: ${orderTotal.toFixed(2)}
                        </div>
                    </div>
                    
                </div>
            </div>
            {detailToggle ?
                <div className="order-details-wrapper">
                    {orderElements}
                </div>
                :
                <div></div>
            }
            
        </div>
        
    )
}