import { FormEventHandler } from "react";

type NewTaskPProps = {
  onCreate: (value: string) => void;
};

export default function NewTask(props: Readonly<NewTaskPProps>) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = form.get("taskName") as string;
    if (!value) return;

    props.onCreate(value);
    e.currentTarget.reset();
  };

  return (
    <form className="new-task" onSubmit={handleSubmit}>
      <input type="text" className="input" name="taskName" />
      <button type="submit" className="btn">
        Create Task
      </button>
    </form>
  );
}
