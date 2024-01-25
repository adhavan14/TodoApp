import { useState } from "react"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import axios from "axios"


const url = "http://localhost:8080/todo/"

function TodoForm() {

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

    const handleSubmit = () => {

        const payload = {
            title : formData.title,
            description : formData.description
        }
        axios.post(url + "create", payload)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="p-4">
            <form className="flex justify-between items-center">
                <div className="ml-40 w-1/6">
                <TextField
                    id="standard-textarea-title"
                    label="Title"
                    variant="outlined"
                    name="title"
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
                    onChange={handleInputData}
                    className="w-full"
                />
                </div>
                <div className="w-1/6">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
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