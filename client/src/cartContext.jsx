import React, { useState, useEffect, createContext, useContext } from "react"
import { UserContext } from "./components/userContext.jsx"

const CartContext = createContext()

function CartContextProvider(props){

    const [userCart, setUserCart] = useState([]);
    const { _id } = useContext(UserContext);

    useEffect(() => {
        if(_id) {
            axios.get(`/api/cart/${_id}`)
                .then(res => setUserCart(res.data))
        }
    }, [_id])
    
    return(
        <CartContext.Provider value={{ userCart }}>
           {props.children}
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider}