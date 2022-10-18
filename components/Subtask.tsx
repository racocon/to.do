import axios from "axios";
import { useState } from "react";
import { SubtaskProps } from "../src/models/models";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface props {
  index: number;
  keyID: string;
  subtasks: Array<SubtaskProps>;
  subtask: SubtaskProps;
  setSubtasks: React.Dispatch<React.SetStateAction<Array<SubtaskProps>>>;
}
export default function Subtask({
  index,
  subtasks,
  subtask,
  keyID,
  setSubtasks,
}: props) {
  const [checked, setChecked] = useState(false);

  const handleDone = () => {
    setChecked(!checked);

    const tasksCopy = [...subtasks];

    let statusCopy = false;

    statusCopy = subtask.status;
    subtask.status = !statusCopy;

    const dataStatus = {
      status: subtask.status,
    };

    axios
      .patch(`${API_URL}/${keyID}/subtasks/${index}.json`, dataStatus)
      .then((res) => {
        setSubtasks(tasksCopy);
      });

    setSubtasks(tasksCopy);
  };

  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        className="mr-2 my-auto"
        onChange={() => handleDone()}
        checked={subtask.status}
      />

      <p className={`${subtask.status && "line-through"} py-1 opacity-80`}>
        {subtask.subtask}
      </p>
    </div>
  );
}
