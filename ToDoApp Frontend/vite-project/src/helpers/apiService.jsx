import axios from "axios";
import { useState } from "react";

const url = "http://localhost:8080/todo/"
const [data, setData] = useState([]);

export default {
    getAll : () => {
        axios.get(url + "getAll")
        .then(response => {
            setData(response.data)
        }).catch(error => {
            console.error(error)
        })
        return data
    },
  
    addTodo: (payload) => {
      const response = axios.post(url + "create", payload);
      return response.data;
    },

    deleteTodo: (itemId) => {
      const response =  axios.delete(url + "delete", { params: { id: itemId } });
      return response;
    },
  };