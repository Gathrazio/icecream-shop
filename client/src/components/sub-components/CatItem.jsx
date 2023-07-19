import { useState } from 'react'

export default function CatItem (props) {
    const [inputValue, setInputValue] = useState(1);

    function handleChange (e) {
        const {value} = e.target;
        setInputValue(value)
    }

    function handleSubmit (e) {
        e.preventDefault()
    }

    return (
        <div className="catitem-wrapper">
                <h3 className="catitem-title">{props.itemInfo.title}</h3>
                <img src={props.itemInfo.imgUrl} className="catitem-image" />
            <form className="catitem-input-button-wrapper" onSubmit={handleSubmit}>
                <input type="Number" min="1" step="1" className="catitem-input" />
                <button className="catitem-add-button">Add to Cart</button>
            </form>
            <div className="catitem-ppi">Price per item: ${props.itemInfo.price}</div>
        </div>
    )
}