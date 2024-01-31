import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import "./home.css"
import ListAltIcon from '@mui/icons-material/ListAlt';
import TodoForm from "./newTodo/newTodo";
import TodoItem from "./todo/todoItem";
import { userContext } from "./router/rootRouter";


const url = "http://localhost:8080/todo/"

function ShowTodos() {

    const [data, setData] = useState([]);
    const { token } = useContext(userContext); 

    useEffect(() => {
        getAll()
    }, []);

    const getAll = async() => {
        const header = {Authorization : `Bearer ${token}`}
        const response = await axios.get(url + "getAll", { headers:header })
        setData(response.data)
    }
    
    const handleClickDelete = (itemId) => {
        const header = {Authorization : `Bearer ${token}`}
        console.log(token)
        axios.delete(url + "delete", { params: { id: itemId } , headers:header})
        .then(response => {
            console.log(response.data)
            getAll()
        }).catch(error => {
            console.error(error)
        })
    }


    const onCheckboxToggle = (taskId) => {
        setData((prevTodos) =>
          prevTodos.map((todo) =>
            todo.Id === taskId ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
    };

    return <div>
        <div className="flex p-4 text-2xl bg-beige items-center justify-center">
            <h1>THINGS TO BE SMASHED</h1>
            <ListAltIcon></ListAltIcon>
        </div>
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
}

export default ShowTodos