import { useContext, useState } from "react"
import { TextField } from "@mui/material"
import {Button} from "@mui/material"
import { userContext } from "../router/rootRouter"
import { useNavigate } from "react-router-dom"

const url = "http://localhost:8080/user/"

const SignUp = () => {

    const {handleSignUp} = useContext(userContext)
    const navigate = useNavigate()
    console.log(handleSignUp)

    const [signUpData, setSignUpDate] = useState({
        username : "",
        password : ""
    })

    const handleInputData = (e) => {
        const { name, value } = e.target;
            setSignUpDate({
            ...signUpData,
            [name]: value,
        });
    }

    return (
        <div className="p-4 ">
            <h1 className="text-2xl">SIGN UP</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSignUp(signUpData.username, signUpData.password); navigate("/")}} className=" flex flex-col justify-center items-center">
                <div className="p-4 w-1/4">
                <TextField
                    id="standard-textarea-title"
                    label="Username"
                    variant="outlined"
                    name="username"
                    onChange={handleInputData}
                    className="w-full"
                />
                </div>
                <div className="p-4 w-1/4">
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
                    disabled={signUpData.username === '' || signUpData.password === ''}
                >
                    SIGN UP
                </Button>
                </div>
                <div className="text-sm flex flex-row ">
                        <h6 className="p-4">Already have account ? </h6>
                        <a className="py-4 underline" href="/">Login</a>
                </div>
            </form>
        </div>
    )
}

export default SignUp