import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './userContext.jsx'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



export default function SignIn () {
    const { designateVUI, navOK, toggleNavOK } = useContext(UserContext);
    const [userID, setUserID] = useState('');
    const navigate = useNavigate();
    const initialAccountCreationInfo = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        orders: []
    };
    const initialSignInInfo = {
        username: '',
        password: ''
    }
    const [accountCreationInfo, setAccountCreationInfo] = useState(initialAccountCreationInfo);
    const [signInInfo, setSignInInfo] = useState(initialSignInInfo);

    useEffect(() => {
        designateVUI({})
    }, [])

    function handleAccountCreationChange (e) {
        const {name, value} = e.target;
        setAccountCreationInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSignInChange (e) {
        const {name, value} = e.target;
        setSignInInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleAccountCreationSubmit (e) {
        e.preventDefault()
        axios.post('/api/users/', accountCreationInfo)
            .then(res => designateVUI(res.data))
            .catch(err => console.log(err))
        setAccountCreationInfo(initialAccountCreationInfo)
    }

    function handleSignInSubmit (e) {
        e.preventDefault()
        axios.get('/api/users/')
            .then(res => res.data.find(user => user.username === signInInfo.username && user.password === signInInfo.password))
            .then(user => {
                if (user) {
                    designateVUI(user)
                    setUserID(user._id)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Username or password is incorrect.",
                        text: "Please try again.",
                        confirmButtonText: "OK"
                    })
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (navOK) {
        Swal.fire({
            icon: "success",
            title: "Successfully logged in!",
            text: "Browse our wares!",
            confirmButtonText: "OK"
        })
        toggleNavOK()
        navigate(`/navigation/${userID}`)
    }
    }, [navOK])
    

    return (
        <div className="signin-wrapper main">

            <form name="createaccount-form" className="createaccount-form" onSubmit={handleAccountCreationSubmit}>
                <input
                    className="account-creation-input"
                    type="text"
                    name="firstName"
                    value={accountCreationInfo.firstName}
                    placeholder="First name"
                    onChange={handleAccountCreationChange}
                    required
                />
                <input
                    className="account-creation-input"
                    type="text"
                    name="lastName"
                    value={accountCreationInfo.lastName}
                    placeholder="Last name"
                    onChange={handleAccountCreationChange}
                    required
                />
                <input
                    className="account-creation-input"
                    type="text"
                    name="username"
                    value={accountCreationInfo.username}
                    placeholder="Username"
                    onChange={handleAccountCreationChange}
                    required
                />
                <input
                    className="account-creation-input"
                    type="password"
                    name="password"
                    value={accountCreationInfo.password}
                    placeholder="Password"
                    onChange={handleAccountCreationChange}
                    required
                />
                <button className="signin-button">Create Account</button>
            </form>
            <form name="signin-form" className="signin-form" onSubmit={handleSignInSubmit}>
                <input
                    className="sign-in-input"
                    type="text"
                    name="username"
                    value={signInInfo.username}
                    placeholder="Username"
                    onChange={handleSignInChange}
                    required
                />
                <input
                    className="sign-in-input"
                    type="password"
                    name="password"
                    value={signInInfo.password}
                    placeholder="Password"
                    onChange={handleSignInChange}
                    required
                />
                <button className="signin-button">Sign In</button>
            </form>
        </div>
    )
}