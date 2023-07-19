import CategoryNav from './CategoryNav'
import { useState, useEffect } from 'react'
import CatItem from './CatItem'

export default function Category (props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`/api/items/category/${props.category.toLowerCase()}`)
            .then(res => setItems(res.data))
    }, [])

    const renderedItems = items.map(item => <CatItem key={item._id} itemInfo={item}/>)

    return (
        <div className="category-wrapper">
            <CategoryNav category={props.category} navReturn={props.navReturn} />
            <div className="itemcollection-wrapper content-bearing">
                {renderedItems}
            </div>
            
        </div>
    )
}