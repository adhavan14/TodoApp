import { useContext, useState } from "react"
import { userContext } from "../router/rootRouter"
import { TextField } from "@mui/material"
import {Button} from "@mui/material"

const Login = () => {

    const [loginData, setLoginData] = useState({
        username : "",
        password : ""
    })

    const handleInputData = (e) => {
        const { name, value } = e.target;
            setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    const {handleLogin} = useContext(userContext);

    return (
            <div className="p-4">
                <h1 className="text-2xl">LOGIN</h1>
                <form onSubmit={(e) => {e.preventDefault(); handleLogin(loginData.username, loginData.password)}} className=" flex flex-col justify-center items-center">
                    <div className="w-1/4 p-4">
                    <TextField
                        id="standard-textarea-title"
                        label="Username"
                        variant="outlined"
                        name="username"
                        onChange={handleInputData}
                        className="w-full"
                    />
                    </div>
                    <div className="w-1/4 p-4">
                    <TextField
                        id="standard-textarea-description"
                        label="Password"
                        variant="outlined"
                        name="password"
                        onChange={handleInputData}
                        className="w-full"
                    />
                    </div>
                    <div className="p-4">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loginData.username === '' || loginData.password === ''}
                        className=""
                    >
                        LOGIN
                    </Button>
                    </div>
                    <div className="text-sm flex flex-row ">
                        <h6 className="p-4">Create new account ? </h6>
                        <a className="py-4 underline" href="/signUp">Sign up</a>
                    </div>
                </form>
            </div>
    )
}

export default Login