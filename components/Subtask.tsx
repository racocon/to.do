import { useState } from "react";
import { SubtaskProps } from "../src/models/models";

interface props {
  subtask: SubtaskProps;
}
export default function Subtask({ subtask }: props) {
  const [checked, setChecked] = useState(false);

  // TODO: add function to subtask checkbox - update subtask.status when toggled
  const handleDone = (id: number) => {
    setChecked(!checked);

    // subtask.id === id
    //   ? {
    //       ...subtask,
    //       status: subtask.status == "In Progress" ? "Done" : "In Progress",
    //     }
    //   : subtask;
  };

  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        className="checked:bg-success mr-2"
        onChange={() => handleDone(subtask.id)}
        checked={checked}
      />

      <p className="py-1 opacity-80">{subtask.subtask}</p>
    </div>
  );
}
