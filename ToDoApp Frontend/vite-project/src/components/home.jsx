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
    const [activeFilter, SetActiveFilter] = useState([])

    useEffect(() => {
        getAll()
    }, []);

    const getAll = async() => {
        const header = {Authorization : `Bearer ${token}`}
        const response = await axios.get(url + "getAll", { headers:header })
        SetActiveFilter(["contained", "",""])
        setData(response.data)
    }
    
    const handleClickDelete = async (itemId) => {
        const header = {Authorization : `Bearer ${token}`}
        console.log(token)
        await axios.delete(url + "delete", { params: { id: itemId } , headers:header})
        getAll()
    }

    const getAllActive = async() => {
        const header = {Authorization : `Bearer ${token}`}
        const response = await axios.get(url + "getAllActive", {headers:header})
        SetActiveFilter(["", "contained", ""])
        setData(response.data)
    }

    const getAllCompleted = async() => {
        const header = {Authorization : `Bearer ${token}`}
        const response = await axios.get(url + "getAllCompleted", {headers:header})
        SetActiveFilter(["", "","contained"])
        setData(response.data)
    }

    const deleteAllCompleted = async() => {
        const header = {Authorization : `Bearer ${token}`}
        console.log(token)
        await axios.delete(url + "deleteAll", {headers:header})
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
        <div className="ml-5 mr-5 mt-5 overflow-hidden todo-background-image absolute z-0 w-[98%]">
            <div className="ml-5 mr-5 mt-20 todo-background-color absolute z-0 w-[98%] blur-image"></div>
        </div>
        
        </div>
        <div className="absolute z-30 mt-8 w-full">
            <img src="src/resources/logout.png" className="size-10  bg-white rounded-[20px] float-end mr-8" onClick={handleClickLogout}></img>
        </div>
     <div className="absolute z-30 w-full mt-36">
        <div>
            <h1 className="heading">TODO</h1>
        </div>
        <div >
            <div className="bg-white w-[60%] rounded-xl mx-auto ">
                <TodoForm getTodos = {getAll}></TodoForm>
            </div>
            <div className="bg-white flex justify-between items-center w-[60%] h-14 mx-auto rounded-xl mt-7">
                <h4 className="ml-5"> {data ? data.length : 0} ITEMS </h4>
                <div className="mx-auto">
                    <Button variant={activeFilter[0]} onClick={getAll}> all </Button>
                    <Button variant={activeFilter[1]} onClick={getAllActive}> active </Button>
                    <Button variant={activeFilter[2]} onClick={getAllCompleted}> completed </Button>
                </div>
                <Button className="!mr-5" onClick={deleteAllCompleted}>clear completed</Button>
            </div>
            <div className="bg-white w-[60%] mt-10 rounded-xl mx-auto max-h-[500px]">
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