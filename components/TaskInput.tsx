import axios from "axios";
import React, { useState } from "react";
import { SubtaskProps, TaskProps } from "../src/models/models";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface props {
  keyID: Array<string>;
  listType: number;
  taskIndex?: number;
  tasks: Array<TaskProps>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
}

export default function TaskInput({
  keyID,
  listType,
  tasks,
  taskIndex,
  onBlur,
  setTasks,
}: props) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataSubtask = { id: Date.now(), subtask: inputText, status: false };

    const dataTask = {
      id: Date.now(),
      task: inputText,
      status: false,
      subtasks: [],
    };

    if (inputText) {
      // Add subtask
      if (
        // If subtasks exist
        listType === 1 &&
        typeof taskIndex !== "undefined" &&
        [...tasks][taskIndex].subtasks != undefined
      ) {
        const subtaskListCopy = [...tasks][taskIndex].subtasks;

        const subtaskList = {
          subtasks: [...subtaskListCopy, dataSubtask],
        };

        axios
          .patch(`${API_URL}/${keyID[taskIndex]}.json`, subtaskList)
          .then((res) => {
            const taskListCopy = [...tasks];
            // taskListCopy[taskIndex].subtasks.push(subtaskList);
            // setTasks(subtaskList);
          });
      } else if (
        listType === 1 &&
        typeof taskIndex !== "undefined" &&
        [...tasks][taskIndex].subtasks == undefined
      ) {
        const subtaskList = {
          subtasks: [dataSubtask],
        };

        axios
          .patch(`${API_URL}/${keyID[taskIndex]}.json`, subtaskList)
          .then((res) => {
            const taskListCopy = [...tasks];
            // taskListCopy[taskIndex].subtasks.push(subtaskList);
            // setTasks(taskListCopy);
          });
      } else {
        axios.post(`${API_URL}.json`, dataTask).then((res) => {
          setTasks([...tasks, dataTask]);
        });
      }
      setInputText("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="w-full"
    >
      <input
        className="md:w-1/2 w-full border rounded-md px-4 py-1 mr-5"
        autoFocus
        onBlur={onBlur}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        value={inputText}
        placeholder="What needs to be done?"
      />
    </form>
  );
}
