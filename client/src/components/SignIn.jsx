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
            axios.post('/api/users/', info)
                .then(res => {
                    designateVUI(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Your account has been successfully created and you are logged in!",
                        text: "Please peruse our confections to your heart's content!",
                        confirmButtonText: "OK"
                    })
                })
            .catch(err => console.log(err))
        } else {
            axios.get('/api/users')
                .then(res => res.data.find(user => user.username === signInInfo.username && user.password === signInInfo.password))
                .then(user => {
                    if (user) {
                        designateVUI(user)
                        Swal.fire({
                            icon: "success",
                            title: "Successfully logged in!",
                            text: "Please peruse our confections to your heart's content!",
                            confirmButtonText: "OK"
                        })
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
            <button className="toggle">{signUpLoginToggle ? 'Already have an account?' : `Don't have an account?`}</button>
        </div>
    )
}