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
        <>
        <div className="p-4 pt-96 -z-10 absolute w-full auth-background"/>
            <div className="absoulute p-4 pt-52 flex items-center justify-center">
                <div className="w-[600px] border border-white p-4 bg-white rounded-3xl">
                    <div className="grid grid-cols-2">
                        <img src="src/resources/todo-man.svg"></img>
                    <form onSubmit={(e) => {e.preventDefault(); handleSignUp(signUpData.username, signUpData.password); navigate("/")}} className="flex flex-col items-center">
                        <h1 className="text-2xl">SIGN UP</h1>
                        <div className="w-full p-4">
                            <TextField
                                id="standard-textarea-title"
                                label="Username"
                                variant="outlined"
                                name="username"
                                onChange={handleInputData}
                                InputProps={{
                                    style: {
                                    borderRadius: "15px",
                                    }
                                }}
                                className="w-full"
                            />
                        </div>
                        <div className="p-4 w-full">
                        <TextField
                            id="standard-textarea-description"
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            onChange={handleInputData}
                            InputProps={{
                                style: {
                                  borderRadius: "15px",
                                }
                              }}
                            className="w-full"
                        />
                        </div>
                        <div className="p-4">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="!rounded-xl"
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
                </div>
            </div>
        </>
    )
}

export default SignUp