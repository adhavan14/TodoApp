import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./home.css"
import ListAltIcon from '@mui/icons-material/ListAlt';
import TodoForm from "./newTodo/newTodo";
import TodoItem from "./todo/todoItem";


const url = "http://localhost:8080/todo/"

function ShowTodos() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getAll()
    }, []);

    const getAll = () => {
        axios.get(url + "getAll")
        .then(response => {
            setData(response.data)
        }).catch(error => {
            console.error(error)
        })
    }
    
    const handleClickDelete = (itemId) => {
        axios.delete(url + "delete", { params: { id: itemId } })
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
            <TodoForm></TodoForm>
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
                    onCheckboxToggle={onCheckboxToggle}
                    onDelete={handleClickDelete}/>
                ))
                ) : (
                    <li>No data available</li>
                )
            }
        </ol>
        </div>
}

export default ShowTodos