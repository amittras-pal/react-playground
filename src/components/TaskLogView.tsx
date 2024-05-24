import { IconArrowLeft, IconArrowRight, IconTrash } from "@tabler/icons-react";
import { Task, TaskTypes } from "../types/types";

type TaskLogProps = {
  type: TaskTypes;
  tasks: Task[];
  onMove: (from: TaskTypes, taskId: number, dir: "forward" | "back") => void;
  onDelete: (taskId: number, from: TaskTypes) => void;
};

export default function TaskLogView(props: Readonly<TaskLogProps>) {
  return (
    <div className="board__column">
      <h3>{props.type}</h3>
      <ul className="tasks-list">
        {props.tasks.map((task) => (
          <li key={task.value}>
            <span>{task.value}</span>
            <button
              className="action move-left"
              disabled={props.type === "Backlog"}
              onClick={() => props.onMove(props.type, task.id, "back")}
            >
              <IconArrowLeft size={18} />
            </button>
            <button
              className="action move-right"
              disabled={props.type === "Done"}
              onClick={() => props.onMove(props.type, task.id, "forward")}
            >
              <IconArrowRight size={18} />
            </button>
            <button
              className="action delete"
              onClick={() => props.onDelete(task.id, props.type)}
            >
              <IconTrash size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
