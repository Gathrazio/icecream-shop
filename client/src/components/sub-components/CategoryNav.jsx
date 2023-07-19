import leftArrow from '../../assets/left-arrow.png'
import { useState } from 'react'

export default function CategoryNav (props) {

    const [searchField, setSearchField] = useState('');

    function handleChange (e) {
        const {value} = e.target;
        setSearchField(value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        props.updateQuery(searchField)
    }
    let catPlaceholder = 'strawberry';
    if (props.category === 'Icecream') {
        catPlaceholder = 'vanilla bean';
    } else if (props.category === 'Sandwiches') {
        catPlaceholder = 'spicy sausage';
    }
    return (
        <>
            <div className="category-title-wrapper">
                <h2>{props.category}</h2>
            </div>
            <div className="categorynav-wrapper">
                <img className="cat-nav-back" src={leftArrow} onClick={() => props.navReturn()} />
                <form name="search-form" className="search-form" onSubmit={handleSubmit}>
                    <input type="text" className="searchbar" value={searchField} onChange={handleChange} placeholder={catPlaceholder} />
                    <button className="searchbar-button">Launch</button>
                </form>
                
            </div>
        </>
        
    )
}