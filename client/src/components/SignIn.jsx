import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function SignIn ({verifiedUserInfo, designateVUI}) {
    const navigate = useNavigate();
    const initialInfo = {
        username: '',
        password: ''
    }
    const [info, setInfo] = useState(initialInfo);
    const [signUpLoginToggle, setSignUpLoginToggle] = useState(true);

    function handleInputChange (e) {
        const {name, value} = e.target;
        setInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleInputSubmit (e) {
        e.preventDefault()
        if (signUpLoginToggle) {
            axios.post('/api/auth/signup', info)
                .then(res => {
                    designateVUI(res.data.user)
                    console.log('res.data', res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    Swal.fire({
                        icon: "success",
                        title: "Your account has been successfully created and you are logged in!",
                        text: "Please peruse our confections to your heart's content!",
                        confirmButtonText: "OK",
                        width: '350px',
                        position: 'center'
                    })
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: err.response.data.errMsg,
                        confirmButtonText: "OK",
                        width: '350px',
                        position: 'center'
                    })
                })
        } else {
            axios.post('/api/auth/login', info)
                .then(res => {
                    designateVUI(res.data.user)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    Swal.fire({
                        icon: "success",
                        title: "You are logged in!",
                        text: "Please peruse our confections to your heart's content!",
                        confirmButtonText: "OK",
                        width: '350px',
                        position: 'center'
                    })
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: err.response.data.errMsg,
                        confirmButtonText: "OK",
                        width: '350px',
                        position: 'center'
                    })
                })
        }

    }

    useEffect(() => {
        if (verifiedUserInfo._id) {
            navigate(`/navigation/${verifiedUserInfo._id}`)
        }
    }, [verifiedUserInfo])
    

    return (
        <div className="signin-wrapper main">
            <form name="signin-form" className="signin-form" onSubmit={handleInputSubmit}>
                <input
                    className="sign-in-input"
                    type="text"
                    name="username"
                    value={info.username}
                    placeholder="Username"
                    onChange={handleInputChange}
                    required
                />
                <input
                    className="sign-in-input"
                    type="password"
                    name="password"
                    value={info.password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    required
                />
                <button className="signin-button">{signUpLoginToggle ? 'Create Account' : 'Sign In'}</button>
            </form>
            <button className="toggle" onClick={() => setSignUpLoginToggle(prev => !prev)}>{signUpLoginToggle ? 'Already have an account?' : `Don't have an account?`}</button>
        </div>
    )
}