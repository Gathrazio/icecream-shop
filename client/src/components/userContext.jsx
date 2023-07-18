import { useState, useEffect, createContext } from 'react'

const UserContext = createContext()

function UserContextProvider(props){
    const [verifiedUserInfo, setVerifiedUserInfo] = useState({});
    

    function designateVUI (userDoc) {
        console.log("what we are setting verified user to: ", {...userDoc})
        setVerifiedUserInfo("HELLO:LJODKHJFOISDHOFSD")
    }

    useEffect(() => {
        console.log("verified user info changed")
        console.log("verified user info that has changed: ", verifiedUserInfo)
    }, [verifiedUserInfo])

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