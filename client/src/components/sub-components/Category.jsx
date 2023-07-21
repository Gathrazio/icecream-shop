import CategoryNav from './CategoryNav'
import { useState, useEffect } from 'react'
import CatItem from './CatItem'

export default function Category ({category, navReturn, userCart, updateUserCart, verifiedUserInfo}) {

    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');

    function updateQuery (something) {
        setQuery(something)
    }

    useEffect(() => {
        if (query) {
            axios.get(`/api/items/category/${category.toLowerCase()}/search?title=${query}`)
            .then(res => setItems(res.data))
        } else {
            axios.get(`/api/items/category/${category.toLowerCase()}`)
            .then(res => setItems(res.data))
        }
        
    }, [query])

    const renderedItems = items.map(catItem => <CatItem
            key={catItem._id}
            catItem={catItem}
            userCart={userCart}
            verifiedUserInfo={verifiedUserInfo}
            updateUserCart={updateUserCart}
        />)

    return (
        <div className="category-wrapper">
            <CategoryNav
                category={category}
                navReturn={navReturn}
                updateQuery={updateQuery}
            />
            <div className="itemcollection-wrapper content-bearing">
                {renderedItems}
            </div>
            
        </div>
    )
}