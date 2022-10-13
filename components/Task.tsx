import { useState } from "react";

type TaskProps = {
  id: string;
  text: string;
  status: boolean;
};

export default function Task({ id, text, status }: TaskProps) {
  const [isDone, setIsDone] = useState(status);

  const handleClick = () => {
    return setIsDone(!isDone);
  };

  return (
    <div className="grid grid-cols-6 pb-1">
      <div className="col-span-1 font-bold">
        <p>{id}</p>
      </div>
      <div className="col-span-4">
        <p>{text}</p>
      </div>
      <button
        onClick={() => handleClick()}
        className={`col-span-1 px-4 py-1 rounded-full border font-bold text-center ${
          isDone
            ? "border-[#2ecc71] text-[#2ecc71]"
            : "border-[#f1c40f] text-[#f1c40f]"
        }`}
      >
        {isDone ? "Done" : "In Progress"}
      </button>
    </div>
  );
}
