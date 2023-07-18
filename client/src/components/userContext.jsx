import { useState, useEffect, createContext } from 'react'

const UserContext = createContext()

function UserContextProvider(props){
    const [verifiedUserInfo, setVerifiedUserInfo] = useState({});

    function designateVUI (userDoc) {
        setVerifiedUserInfo(userDoc)
    }
    return(
        <UserContext.Provider value={{
            verifiedUserInfo,
            designateVUI
        }}>
        {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }