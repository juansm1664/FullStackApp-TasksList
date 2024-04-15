import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTask() {
      const resp = await getAllTasks();
      setTasks(resp.data);
    }
    loadTask();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
