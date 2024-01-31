import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import { useContext, useState } from "react";
import axios from "axios";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { userContext } from "../router/rootRouter";


const url = "http://localhost:8080/todo/"
const TodoItem = ({ itemId, title, description, isDone, getTodos,onCheckboxToggle, onDelete }) => {

    const { token } = useContext(userContext)
    const [checked, setChecked] = useState(isDone);
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
  
    const handleCheckboxChange = async () => {
        const payload = {
            title : title,
            description : description,
            isDone : !checked
        }
        const headers = { headers : {Authorization : `Bearer ${token}`} }
        await axios.put(url + "update/" + itemId, payload, headers)

        setChecked(!checked);
        onCheckboxToggle(itemId);
        getTodos()
    };

    const handleClickEdit = async () => {
        
        const payload = {
            title : newTitle,
            description : newDescription,
            isDone : checked
        }
        const headers = { headers : {Authorization : `Bearer ${token}`} }
        await axios.put(url + "update/" + itemId, payload, headers)
        setEdit(false)
        getTodos()
    }
  
    return (
        <div className={`todo-row ${checked ? 'line-through' : ''}`} key={itemId}>
            <div className="w-10">
                <Checkbox
                    checked={checked}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    onChange={handleCheckboxChange}
                    className="w-full"
                    disabled = {edit}
                />
            </div>
            <div className="w-40">{
                edit ? <input className="w-full" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input> :
                <p className="w-full">{title}</p> }
            </div>
            <div className=" w-96">{
                edit ? <input className="w-full" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></input> :
                <p className="w-full">{description}</p>}
            </div>
            <div>
            {
                edit ? <div className="w-10 flex"> 
                            <IconButton className="w-full" size="large" onClick={() => handleClickEdit()}>
                                <DoneIcon></DoneIcon>
                            </IconButton>
                            <IconButton className="w-full" size="large" onClick={() => setEdit(false)}>
                                <CloseIcon ></CloseIcon>
                            </IconButton>
                        </div> :
                <div className="w-10 flex">
                    <IconButton className="w-full" aria-label="edit" size="large" onClick={() => setEdit(true)} disabled = {checked}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className="w-full" aria-label="delete" size="large" onClick={() => onDelete(itemId)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
            </div>
        </div>
    );
};

export default TodoItem