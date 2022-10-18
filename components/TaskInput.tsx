import axios from "axios";
import React, { useState } from "react";
import { SubtaskProps, TaskProps } from "../src/models/models";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface props {
  listType: number;
  taskIndex?: number;
  tasks: Array<TaskProps>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
}

export default function TaskInput({
  listType,
  tasks,
  taskIndex,
  onBlur,
  setTasks,
}: props) {
  const [inputText, setInputText] = useState("");

  // TODO: Fix subtask issue - append subtask to task based on task.id (use PATCH??)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataSubtask = {
      id: Date.now(),
      subtask: inputText,
      status: false,
    };

    const dataTask = {
      id: Date.now(),
      task: inputText,
      status: false,
      subtasks: [],
    };

    if (inputText) {
      // Add subtask
      if (listType === 1 && typeof taskIndex !== "undefined") {
        axios.post(API_URL, dataSubtask).then((res) => {
          const taskListCopy = [...tasks];
          taskListCopy[taskIndex].subtasks.push(dataSubtask);
          setTasks(taskListCopy);
        });
      } else {
        axios.post(API_URL, dataTask).then((res) => {
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
