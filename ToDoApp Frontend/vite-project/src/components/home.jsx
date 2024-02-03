import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import "./home.css"
import TodoForm from "./newTodo/newTodo";
import TodoItem from "./todo/todoItem";
import { userContext } from "./router/rootRouter";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Button, colors } from "@mui/material";


const url = "http://localhost:8080/todo/"

function ShowTodos() {

    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem("token")) 
    const { toggleIsLogin } = useContext(userContext)

    useEffect(() => {
        getAll()
    }, []);

    const getAll = async() => {
        const header = {Authorization : `Bearer ${token}`}
        const response = await axios.get(url + "getAll", { headers:header })
        setData(response.data)
    }
    
    const handleClickDelete = async (itemId) => {
        const header = {Authorization : `Bearer ${token}`}
        console.log(token)
        await axios.delete(url + "delete", { params: { id: itemId } , headers:header})
        getAll()
    }


    const onCheckboxToggle = (taskId) => {
        setData((prevTodos) =>
          prevTodos.map((todo) =>
            todo.Id === taskId ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
    };

    const handleClickLogout = () => {
        localStorage.clear()
        toggleIsLogin()
    }

    return (
        <>
        <div className="bg-gray-200 absolute -z-10 w-full h-full">
        <div className="relative">
        <div className="ml-5 mr-5 mt-5 todo-background-image absolute z-0 w-[98%]"></div>
        <div className="ml-5 mr-5 mt-20 todo-background-color absolute z-0 w-[98%] blur-image"></div>
        </div>
        <div className="absolute z-30 mt-8 w-full">
            <img src="src/resources/logout.png" className="size-10  bg-white rounded-[20px] float-end mr-8" onClick={handleClickLogout}></img>
        </div>
     <div className="absolute z-30 w-full mt-32">
        <div>
            <h1 className="heading">TODO</h1>
        </div>
        {/* <AppBar position="static">
            <div className="flex items-center">
                <div className="ml-auto">
                    <div className="flex items-center p-4 text-2xl ">
                        <h1 className="heading">THINGS TO BE SMASHED</h1>
                    </div>
                </div>
                <div className="ml-auto p-4">
                    <Button color="inherit" className="heading !text-xl" onClick={handleClickLogout}>Logout</Button>
                </div>
            </div>
        </AppBar> */}
        <div >
            <div className="bg-white w-[60%] rounded-xl mx-auto ">
                <TodoForm getTodos = {getAll}></TodoForm>
            </div>
            <div className="bg-white w-[60%] mt-10 rounded-xl mx-auto">
            <ol>
                {
                    data ? (
                    data.map(item => (
                    <TodoItem
                        key={item.Id}
                        itemId={item.Id}
                        title={item.Title}
                        description={item.Description}
                        isDone={item.IsDone}
                        getTodos = {getAll}
                        onCheckboxToggle={onCheckboxToggle}
                        onDelete={handleClickDelete}/>
                    ))
                    ) : (
                        <div className="mx-auto h-[40%] w-1/2 p-4">
                            <img src="src/resources/nodata-available.jpg" className="rounded-3xl"></img>
                        </div>
                    )
                }
            </ol>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default ShowTodos