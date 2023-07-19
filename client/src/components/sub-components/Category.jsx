import CategoryNav from './CategoryNav'
import { useState, useEffect } from 'react'
import CatItem from './CatItem'

export default function Category (props) {

    const [items, setItems] = useState([]);
    const [query, setQuery] = useState('');

    function updateQuery (something) {
        setQuery(something)
    }

    useEffect(() => {
        if (query) {
            axios.get(`/api/items/category/${props.category.toLowerCase()}/search?title=${query}`)
            .then(res => setItems(res.data))
        } else {
            axios.get(`/api/items/category/${props.category.toLowerCase()}`)
            .then(res => setItems(res.data))
        }
        
    }, [query])

    const renderedItems = items.map(item => <CatItem key={item._id} itemInfo={item} addItem={props.addItem} />)

    return (
        <div className="category-wrapper">
            <CategoryNav category={props.category} navReturn={props.navReturn} updateQuery={updateQuery} />
            <div className="itemcollection-wrapper content-bearing">
                {renderedItems}
            </div>
            
        </div>
    )
}