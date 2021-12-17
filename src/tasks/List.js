import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function List() {
    const [page, setPage] = useState(1);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`/api/tasks?page=${page}`).then(res => res.json()).then(setTasks);
    }, [setTasks, page])



    if (!tasks) {
        return 'loading...'
    }

    return (
        <>
            <div>
                {tasks.map((task) =>
                    <li key={task.id}>
                        <Link to={`/tasks/${task.id}`}>
                            {task.title}
                        </Link>
                    </li>)}
            </div>

            <div>
                {page !== 1 ? <button>To Page {page - 1}</button> : null}
                <button onClick={() => setPage(page + 1)}>To Page {page + 1}</button>
            </div>
        </>

    )
}