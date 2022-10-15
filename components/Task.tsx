import { useState } from "react";

import { TaskProps } from "../src/models/models";

const Task: React.FC<{
  index: number;
  task: TaskProps;
  tasks: Array<TaskProps>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
}> = ({ task, tasks, setTasks }) => {
  const [dropdown, setDropdown] = useState<Boolean>(false);
  const [style, setStyle] = useState<string>("hidden");
  const [input, setInput] = useState<Boolean>(false);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status == "In Progress" ? "Done" : "In Progress",
            }
          : task
      )
    );
  };

  return (
    <tr key={task.id}>
      {/* ID */}
      <td className="w-1/5 py-4 pl-6 pr-3 font-medium">{task.id}</td>

      {/* SUMMARY */}
      <td className="w-1/2 px-3 py-4 text-sm">
        <div className="flex flex-row">
          {/* DROPDOWN TO DISPLAY SUBTASKS */}

          <button onClick={() => setDropdown(!dropdown)}>
            {dropdown ? (
              // Opened
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            ) : (
              // Closed
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
              </svg>
            )}
          </button>
          <div className="w-full">
            {/* TASK */}
            <div>{task.task}</div>

            {/* PROGRESS BAR */}
            <div className="mt-2 w-1/2 rounded-full bg-light-gray dark:bg-light-gray/20">
              <div className="bg-success dark:bg-success-dark w-1/4 text-xs font-medium p-0.5 rounded-full"></div>
            </div>
          </div>

          {/* ADD NEW SUBTASK BUTTON */}
          <div
            className="w-6 h-6"
            onMouseEnter={(e) => {
              setStyle("block bg-primary p-1 rounded-md active:bg-secondary");
            }}
            onMouseLeave={(e) => {
              setStyle("hidden");
            }}
          >
            <button
              onClick={() => (setInput(true), setDropdown(true))}
              className={style}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
        </div>

        {/* SUBTASK INPUT */}
        {input && (
          <div className="flex flex-row justify-between w-full">
            <form
              className="w-full"
              // onSubmit={(e) => {
              //   handleSubmit(e);
              // }}
            >
              <input
                autoFocus
                className="w-1/2 rounded-md ml-6 mt-2 px-2 opacity-80 focus"
                type="text"
                placeholder="+ Add subtask"
              />
            </form>
            <button onClick={() => (setInput(false), setDropdown(false))}>
              Cancel
            </button>
          </div>
        )}
      </td>

      {/* STATUS */}
      <td className="px-3 py-4 text-sm">
        <button
          onClick={() => handleDone(task.id)}
          className={`inline-flex rounded-full px-4 text-sm font-semibold leading-5 ${
            task.status == "Done"
              ? "bg-success/20 text-success dark:bg-success-dark/20 dark:text-success-dark"
              : task.status == "In Progress"
              ? "bg-alert/20 text-alert dark:bg-alert-dark/20 dark:text-alert-dark"
              : "bg-accent/20 text-accent dark:bg-accent-dark/20 dark:text-accent-dark"
          }`}
        >
          {task.status}
        </button>
      </td>

      {/* EDIT */}
      <td className="relative py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
        <a href="#" className="text-primary hover:text-secondary">
          Edit<span className="sr-only">, {task.task}</span>
        </a>
      </td>
    </tr>
  );
};

export default Task;
