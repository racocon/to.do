import axios from "axios";
import { useState } from "react";

import { SubtaskProps, TaskProps } from "../src/models/models";
import Subtask from "./Subtask";
import TaskInput from "./TaskInput";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface props {
  keyID: Array<string>;
  taskIndex: number;
  task: TaskProps;
  tasks: Array<TaskProps>;
  setSubtasks: React.Dispatch<React.SetStateAction<Array<SubtaskProps>>>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
}

export default function Task({
  keyID,
  taskIndex,
  task,
  tasks,
  setTasks,
  setSubtasks,
}: props) {
  const [dropdown, setDropdown] = useState<Boolean>(false);
  const [style, setStyle] = useState<string>("hidden");
  const [input, setInput] = useState<Boolean>(false);

  const handleDone = () => {
    const tasksCopy = [...tasks];

    let statusCopy = false;

    statusCopy = task.status;
    task.status = !statusCopy;

    const dataStatus = {
      status: task.status,
    };

    axios
      .patch(`${API_URL}/${keyID[taskIndex]}.json`, dataStatus)
      .then((res) => {
        setTasks(tasksCopy);
      });
  };

  const completed_subtasks = task.subtasks?.filter((x) => x.status).length;

  const total_subtasks = task.subtasks?.length;

  const check_subtask = total_subtasks > 0;

  const percentage = Math.round((completed_subtasks / total_subtasks) * 100);

  return (
    <tr key={task.id} className="">
      {/* ID */}
      <td className="w-1/5 py-4 pl-6 pr-3 font-medium hidden md:table-cell">
        {task.id}
      </td>

      {/* SUMMARY */}
      <td
        className="w-1/2 px-3 py-4 text-sm"
        // Dislay add subtask button when hover
        onMouseEnter={(e) => {
          setStyle(
            "block bg-primary p-1 w-7 h-7 rounded-md active:bg-secondary"
          );
        }}
        onMouseLeave={(e) => {
          setStyle("hidden");
        }}
      >
        {/* Display ID in mobile */}
        <dl className="font-normal lg:hidden pb-2">
          <dt className="sr-only">ID</dt>
          <dd className="mt-1 truncate font-semibold">{task.id}</dd>
        </dl>

        <div className="flex flex-row">
          {/* Dropdown to display substasks */}
          {check_subtask && (
            <button onClick={() => setDropdown(!dropdown)} className="h-6">
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
          )}

          <div className="w-full">
            {/* TASK */}
            <div className="mb-2">{task.task}</div>

            {/* PROGRESS BAR */}
            {check_subtask && (
              <>
                <div className="mt-2 md:w-[15.625rem] w-[10rem] rounded-full bg-light-gray dark:bg-light-gray/20">
                  <div
                    className={`bg-success dark:bg-success-dark text-xs font-medium p-0.5 rounded-full `}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <p className="pt-2">
                  {completed_subtasks}/{total_subtasks} subtasks completed
                </p>
              </>
            )}
          </div>

          {/* Add new subtask button */}
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

        {/* Subtask accordion */}
        {dropdown && (
          <div className={`${check_subtask ? "pl-6" : "pl-0"}`}>
            {/* SUBTASKS LIST */}
            {check_subtask && (
              <div className="my-1">
                {task.subtasks.map((item, index) => {
                  return (
                    <Subtask
                      key={index}
                      index={index}
                      keyID={keyID[taskIndex]}
                      subtasks={task.subtasks}
                      subtask={item}
                      setSubtasks={setSubtasks}
                    />
                  );
                })}
              </div>
            )}

            {/* SUBTASK INPUT */}
            {input && (
              <div className="flex flex-row justify-between w-full">
                <TaskInput
                  keyID={keyID}
                  listType={1}
                  tasks={tasks}
                  setTasks={setTasks}
                  taskIndex={taskIndex}
                  onBlur={() => setInput(false)}
                />
              </div>
            )}
          </div>
        )}
      </td>

      {/* STATUS */}
      <td className="px-3 py-4 text-sm">
        {(
          check_subtask
            ? task.status &&
              task.subtasks.every((element) => element.status === true)
            : task.status
        ) ? (
          <div className="inline-flex rounded-full px-4 md:text-sm text-xs font-semibold leading-5 bg-accent/20 text-accent dark:bg-accent-dark/20 dark:text-accent-dark">
            Complete
          </div>
        ) : (
          <button
            onClick={() => handleDone()}
            className={`inline-flex rounded-full px-4 md:text-sm text-xs truncate font-semibold leading-5 ${
              task.status
                ? "bg-success/20 text-success dark:bg-success-dark/20 dark:text-success-dark"
                : "bg-alert/20 text-alert dark:bg-alert-dark/20 dark:text-alert-dark"
            }`}
          >
            {task.status ? "Done" : "In Progress"}
          </button>
        )}
      </td>

      {/* EDIT */}
      <td className="relative py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
        <a href="#" className="text-primary hover:text-secondary">
          Edit<span className="sr-only">, {task.task}</span>
        </a>
      </td>
    </tr>
  );
}
