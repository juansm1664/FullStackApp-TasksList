import {Link} from "react-router-dom";

export function Navigation() {
    return(
        <div className="flex justify-between py-3">
            <Link to="/tasks">
            <h1 className="font-bold text-3x1 mb-4">Task app</h1>
            </Link>
            <button className="bg-fuchsia-600 px-4 py-2 rounded-lg">
                <Link to= "/tasks-create">Create Tasks</Link>
            </button>
        </div>

    )
}