import Task from "./Task";

const task_list = [
  {
    id: "KEY-001",
    text: "Pick up potatoes at the store",
    status: true,
  },
  {
    id: "KEY-002",
    text: "Get a job",
    status: false,
  },
];

export default function TaskList() {
  return (
    <div className="py-8">
      {task_list.map((item, index) => {
        return (
          <Task
            key={index}
            id={item.id}
            text={item.text}
            status={item.status}
          />
        );
      })}
    </div>
  );
}
