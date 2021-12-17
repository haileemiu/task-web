import { useState } from "react"
import { useHistory } from "react-router-dom"


export default function New() {
    const history = useHistory();

    const [task, setTask] = useState({
        title:'',
        date: Date.now,
        completed: false
    });
    
    const handleTitleInputChange = (event) => {
        setTask({...task, title: event.target.value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(task)
        }

        // TODO: check status code
        // TODO: check for id

        const res = await fetch('/api/tasks', options);
        const newTask = await res.json();
        history.push(`/tasks/${newTask.id}`)
    };


    return(
        
        <form onSubmit={handleSubmit}>
            
            <label>
                Title:
                <input type="text" name="title" value={task.title} onChange={handleTitleInputChange}/>
            </label>

            <input type="submit" value="Add"/>
        </form>
        
    )
}