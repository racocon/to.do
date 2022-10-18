import { useState } from "react";
import { SubtaskProps } from "../src/models/models";

interface props {
  subtasks: Array<SubtaskProps>;
  subtask: SubtaskProps;
  setSubtasks: React.Dispatch<React.SetStateAction<Array<SubtaskProps>>>;
}
export default function Subtask({ subtasks, subtask, setSubtasks }: props) {
  const [checked, setChecked] = useState(false);

  // TODO: add function to subtask checkbox - update subtask.status when toggled
  const handleDone = () => {
    setChecked(!checked);

    const tasksCopy = [...subtasks];

    let statusCopy = false;

    statusCopy = subtask.status;
    subtask.status = !statusCopy;

    setSubtasks(tasksCopy);
  };

  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        className="checked:bg-success mr-2 my-auto"
        onChange={() => handleDone()}
        checked={subtask.status}
      />

      <p className="py-1 opacity-80">{subtask.subtask}</p>
    </div>
  );
}
