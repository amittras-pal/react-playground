import { useState } from "react";
import "./App.scss";
import NewTask from "./components/NewTask";
import TaskLogView from "./components/TaskLogView";
import { TaskLog, TaskTypes } from "./types/types";

function App() {
  const [tasks, setTasks] = useState<TaskLog>({
    Backlog: [{ id: 1716554292446, value: "Task 1" }],
    "To Do": [{ value: "Something Else", id: 1716555953406 }],
    OnGoing: [],
    Done: [],
  });

  const handleAdd = (e: string) => {
    setTasks((prev) => ({
      ...prev,
      Backlog: [...prev.Backlog, { value: e, id: new Date().getTime() }],
    }));
  };

  const handleMove = (
    from: TaskTypes,
    taskId: number,
    dir: "forward" | "back"
  ) => {
    setTasks((prev) => {
      let target: TaskTypes | null = null;
      switch (from) {
        case "Backlog":
          target = dir === "forward" ? "To Do" : null;
          break;
        case "To Do":
          target = dir === "forward" ? "OnGoing" : "Backlog";
          break;
        case "OnGoing":
          target = dir === "forward" ? "Done" : "To Do";
          break;
        case "Done":
          target = dir === "back" ? "OnGoing" : null;
      }

      if (!target) return prev;

      const taskToMove = tasks[from].find((t) => t.id === taskId);
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== taskId),
        [target]: [...prev[target], taskToMove],
      };
    });
  };

  const handleDelete = (taskId: number, from: TaskTypes) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== taskId),
    }));
  };

  return (
    <>
      <NewTask onCreate={handleAdd} />
      <div className="board">
        {Object.entries(tasks).map(([type, list]) => (
          <TaskLogView
            key={type}
            type={type as TaskTypes}
            tasks={list}
            onMove={handleMove}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default App;
