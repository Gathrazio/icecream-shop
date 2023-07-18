import React, { useState, useEffect, createContext } from "react"

const CartContext = createContext()

function CartContextProvider(props){

    const [userCart, setUserCart] = useState([]);

    useEffect(() => {
        axios.get('/api/cart/64b3455f2f4f5a5d7097fb95')
            .then(res => setUserCart(res.data))
    }, [])
    
    return(
        <CartContext.Provider value={{ userCart }}>
           {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider}