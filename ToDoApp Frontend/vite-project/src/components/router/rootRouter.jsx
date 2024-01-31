import { createContext, useState } from "react"
import Login from "../auth/login"
import React, { useContext } from "react";
import ShowTodos from "../home";
import axios from "axios";
import SignUp from "../auth/signUp";

export const userContext = createContext(null)

export const UserProvider = ({ children }) => {

    const [token, setToken] = useState()
    const [signUpStatus, setSignUpStatus] = useState(200)

    const handleLogin = (username, password) => {
        
        const url = "http://localhost:8080/user/"
        const payload = {
            username,
            password
        }

        axios.post(url + "login", payload)
        .then(response => {
            console.log(response.status)
            setToken(response.data.token)
        }).catch(error => {
            console.error(error)
        })
    }

    const handleSignUp = (username, password) => {
        const url = "http://localhost:8080/user/"
        const payload = {
            username,
            password
        }

        axios.post(url + "create", payload)
        .then(response => {
            console.log(response.data)
            setSignUpStatus(response.status)
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <userContext.Provider value={{
            token,
            signUpStatus,
            handleLogin,
            handleSignUp
        }}>
            {children}
        </userContext.Provider>
    )
}

const Routers = () => {

    const { token } = useContext(userContext);
    const {signUpStatus} = useContext(userContext);
    
    return (
        <div>
            {token ? <ShowTodos /> : (signUpStatus == 200 ? <Login /> : <SignUp/>)}
        </div>
    );
}

export default Routers
