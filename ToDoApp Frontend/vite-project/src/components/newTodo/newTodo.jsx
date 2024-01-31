import { useContext, useState } from "react"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import axios from "axios"
import { userContext } from "../router/rootRouter"


const url = "http://localhost:8080/todo/"

function TodoForm({getTodos}) {

    const { token } = useContext(userContext)
    const [formData, setFormData] = useState({
        id : 0,
        title : "",
        description : "",
        isChecked : false
    })

    const handleInputData = (e) => {
        const { name, value } = e.target;
            setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async () => {

        const payload = {
            title : formData.title,
            description : formData.description
        }
        const headers = { headers : {Authorization : `Bearer ${token}`} }
        console.log(headers)

        const response = await axios.post(url + "create", payload, headers)
        console.log(response)
        formData.title = ""
        formData.description = ""
        getTodos()
    }

    return (
        <div className="p-4">
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}} className="flex justify-between items-center">
                <div className="ml-40 w-1/6">
                <TextField
                    id="standard-textarea-title"
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputData}
                    className="w-full"
                />
                </div>
                <div className="w-1/2">
                <TextField
                    id="standard-textarea-description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleInputData}
                    className="w-full"
                />
                </div>
                <div className="w-1/6">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formData.title === '' || formData.description === ''}
                    className="h-14 w-1/3"
                >
                    ADD
                </Button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm