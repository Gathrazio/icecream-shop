import leftArrow from '../../assets/left-arrow.png'
import { useState } from 'react'

export default function CategoryNav ({category, navReturn, updateQuery}) {

    const [searchField, setSearchField] = useState('');

    function handleChange (e) {
        const {value} = e.target;
        setSearchField(value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        updateQuery(searchField)
    }
    let catPlaceholder = 'strawberry';
    if (category === 'Icecream') {
        catPlaceholder = 'vanilla';
    } else if (category === 'Sandwiches') {
        catPlaceholder = 'spicy';
    }
    return (
        <>
            <div className="category-title-wrapper">
                <h2>{category}</h2>
            </div>
            <div className="categorynav-wrapper">
                <img className="cat-nav-back" src={leftArrow} onClick={() => navReturn()} />
                <form name="search-form" className="search-form" onSubmit={handleSubmit}>
                    <input type="text" className="searchbar" value={searchField} onChange={handleChange} placeholder={catPlaceholder} />
                    <button className="searchbar-button">Search</button>
                </form>
                
            </div>
        </>
        
    )
}