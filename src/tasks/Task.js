import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Task() {

    const params = useParams();

    const [task, setTask] = useState({
        completed: false
    });

    useEffect(() => {
        fetch(`/api/tasks/${params.id}`).then(res => res.json()).then(setTask)
    }, [setTask, params.id])

    const taskCompleted = () => {
        setTask({...task, completed: true})
    }


    return (
        <>
            <div>ITEM</div>
            <div>
                <li>{task.title}</li>
                <li>{task.date}</li>
                <li>
                    {task.completed ? "Completed" : <button onClick={() => taskCompleted()}>Done</button>}
                    
                </li>
            </div>
            <Link to={`/tasks/${task.id}/update`}>Update</Link>
        </>
    )
}