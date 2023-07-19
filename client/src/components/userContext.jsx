import { useState, useEffect, createContext } from 'react'

const UserContext = createContext()

function UserContextProvider(props){
    const [verifiedUserInfo, setVerifiedUserInfo] = useState({});
    const [userCart, setUserCart] = useState([]);
    const [navOK, setNavOK] = useState(false);

    function toggleNavOK () {
        setNavOK(prev => !prev)
    }
    

    function designateVUI (userDoc) {
        setVerifiedUserInfo(userDoc)
    }

    useEffect(() => {
        if(verifiedUserInfo._id) {
            axios.get(`/api/cart/${verifiedUserInfo._id}`)
                .then(res => setUserCart(res.data))
                .then(res => setNavOK(true))
        }
    }, [verifiedUserInfo._id])

    return(
        <UserContext.Provider value={{
            verifiedUserInfo,
            userCart,
            navOK,
            designateVUI,
            toggleNavOK
        }}>
        {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }