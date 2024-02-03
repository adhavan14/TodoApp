import { useContext, useState } from "react";
import { userContext } from "../router/rootRouter";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Login = () => {

  const { handleLogin } = useContext(userContext);
  const { loginError } = useContext(userContext)
  const { toggleLoginError } = useContext(userContext)

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    toggleLoginError()
  };

  
  return (
    <>
      <div className="p-4 pt-96 w-full -z-10 absolute auth-background-top"></div>
      <div className="p-4 pt-96 w-full h-screen -z-20 absolute auth-background-bottom"></div>
      <div className="p-4 pt-52">
        <div className="absoulute flex items-center justify-center">
          <div className="w-[600px] border border-white p-4 bg-white rounded-3xl">
            <div className="grid grid-cols-2">
            <img src="src/resources/todo-man.svg" className="h-72"></img>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(loginData.username, loginData.password);
                }}
                className=" flex flex-col items-center"
              >
                <h1 className="text-2xl">LOGIN</h1>
                <div className="w-full p-4">
                  <TextField
                    id="standard-textarea-title"
                    label="Username*"
                    variant="outlined"
                    name="username"
                    onChange={handleInputData}
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                      },
                    }}
                    className="w-full "
                  />
                </div>
                <div className="w-full p-4">
                  <TextField
                    id="standard-textarea-description"
                    label="Password*"
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={handleInputData}
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                      },
                    }}
                    className="w-full"
                  />
                </div>
                <div className="text-xs text-[#ff3333]"> { loginError }</div>
                <div className="p-4">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      loginData.username === "" || loginData.password === ""
                    }
                    className="!rounded-xl"
                  >
                    LOGIN
                  </Button>
                </div>
                <div className="text-sm flex flex-row ">
                  <h6 className="p-4">Create new account ? </h6>
                  <a className="py-4 underline" href="/signUp">
                    Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
