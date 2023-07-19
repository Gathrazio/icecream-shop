import leftArrow from '../../assets/left-arrow.png'

export default function CategoryNav (props) {
    function handleSubmit (e) {
        e.preventDefault()
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
                    <input type="text" className="searchbar" placeholder={catPlaceholder} />
                    <button className="searchbar-button">Launch</button>
                </form>
                
            </div>
        </>
        
    )
}