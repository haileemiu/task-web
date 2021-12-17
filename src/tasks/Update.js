import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"

export default function Update() {

    const history = useHistory();
    const params = useParams();
    const [task, setTask] = useState(
        {
            title: '',
            date: '',
            completed: false
        }
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`/api/tasks/${params.id}`).then(res => res.json()).then((task) => {
            setTask(task)
            setIsLoading(false)
        });
    }, [setTask, params.id])


    const handleInputChange = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setTask({
            ...task,
            // [] allow use of variable as a key
            [event.target.name]: value
        })

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        const res = await fetch(`/api/tasks/${params.id}`, options);

        if (res.status === 200) {
            const updatedTask = await res.json();
            history.push(`/tasks/${updatedTask.id}`)
        } else {
            setError({
                description: "Unable to update at this time.",
                code: res.status
            })
        }
    };

    const handleDelete = () => {
        const options = {
            method: 'DELETE'
        }

        fetch(`/api/tasks/${params.id}/delete`, options)
        history.push(`/tasks`)
    }


    return (
        <>
            <div>UPDATE</div>
            <div>{isLoading ? "Loading..." : null}</div>
            <div>{error ? `error ${error.code}: ${error.description}` : null}</div>

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={task.title} onChange={handleInputChange} />
                </label>
                <label>
                    Date:
                    <input type="text" name="date" value={task.date} onChange={handleInputChange} />
                </label>
                <label>
                    Completed:
                    <input type="checkbox" name="completed" checked={task.completed} onChange={handleInputChange} />
                </label>

                <input type="submit" value="Update" />
            </form>

            <button onClick={handleDelete}>Delete</button>
        </>
    )
}