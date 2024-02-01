import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import "./home.css"
import TodoForm from "./newTodo/newTodo";
import TodoItem from "./todo/todoItem";
import { userContext } from "./router/rootRouter";
import { AppBar, Button, colors } from "@mui/material";
import { Navigate } from "react-router-dom";


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

    return <div>
        
        <AppBar position="static">
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
        </AppBar>
        <div className="todo-background">
            <div>
                <TodoForm getTodos = {getAll}></TodoForm>
            </div>
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
                        <h6 className="flex items-center justify-center">No data available</h6>
                    )
                }
            </ol>
        </div>
        </div>
}

export default ShowTodos