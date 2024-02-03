import { createContext, useState } from "react"
import Login from "../auth/login"
import React, { useContext } from "react";
import ShowTodos from "../home";
import axios from "axios";
import SignUp from "../auth/signUp";

export const userContext = createContext(null)

export const UserProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem("token")))

    const [signUpStatus, setSignUpStatus] = useState(200)

    const [loginError, setLoginError] = useState()

    const [signUpError, setSignUpError] = useState()
    
    const handleLogin = (username, password) => {
        
        const url = "http://localhost:8080/user/"
        const payload = {
            username,
            password
        }

        axios.post(url + "login", payload)
        .then(response => {
            console.log(response.status)
            setLoginError(null)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            setIsLogin(JSON.parse(localStorage.getItem("token")))
        }).catch(error => {
            setLoginError(error.response.data.message)
            console.log(error.response.data.message)
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
            setSignUpStatus(error.response.status)
            setSignUpError(error.response.data.message)
            console.log(error.response.data.message)
        })
    }

    const toggleIsLogin = () => {
        setIsLogin(JSON.parse(localStorage.getItem("token")))
    }

    const toggleLoginError = () => {
        setLoginError(null)
    }

    const toggleSignUpError = () => {
        setSignUpError(null)
    }

    return (
        <userContext.Provider value={{
            isLogin,
            toggleIsLogin,
            loginError,
            signUpError,
            signUpStatus,
            toggleLoginError,
            toggleSignUpError,
            handleLogin,
            handleSignUp
        }}>
            {children}
        </userContext.Provider>
    )
}

const Routers = () => {

    const { isLogin } = useContext(userContext);
    const {signUpStatus} = useContext(userContext);
   
    return (
        <div>
            {isLogin ? <ShowTodos /> : (signUpStatus == 200 ? <Login /> : <SignUp/>)}
        </div>
    );
}

export default Routers
