import React from 'react';
import React, {useState} from "react";
import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";

export default function AuthForm({role, history}) {
    const {setLoggedIn} = React.useContext(GlobalContext);

    const [authInfo, setAuthInfo] = useState( {
        username: "",
        password: ""
    })

    const handleChange = e => {
        setAuthInfo({
            ...authInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        
        axios.post( `https://url.herokuapp.com/auth/${role}`, authInfo)
            .then(res => {
                console.log(res)
                    setLoggedIn(true);
                    localStorage.setItem("token", res.data.token)
                    history.push('/howtos')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="auth-page">
            <h1>Please {role}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={authInfo.username}
                    onChange={handleChange} />
                <input
                    name="password"
                    type="password"
                    value={authInfo.password}
                    onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )



}