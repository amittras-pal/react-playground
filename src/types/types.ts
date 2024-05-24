const TasskTypeList = ["Backlog", "To Do", "OnGoing", "Done"] as const;

export type Task = { id: number; value: string };
export type TaskTypes = (typeof TasskTypeList)[number];
export type TaskLog = Record<TaskTypes, Task[]>;
