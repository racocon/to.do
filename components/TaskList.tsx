import { SubtaskProps, TaskProps } from "../src/models/models";
import Task from "./Task";

interface props {
  keyID: Array<string>;
  tasks: Array<TaskProps>;
  subtasks: Array<SubtaskProps>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
  setSubtasks: React.Dispatch<React.SetStateAction<Array<SubtaskProps>>>;
}

export default function TaskList({
  keyID,
  tasks,
  setSubtasks,
  setTasks,
}: props) {
  return (
    <div className="mt-8 flex flex-col dark:bg-[#242526]">
      <div className="-my-2 md:-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow md:rounded-lg">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="hidden lg:table-cell py-3.5 pl-6 pr-3 text-left font-semibold"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left font-semibold"
                  >
                    Summary
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left font-semibold"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-light-gray align-top">
                {tasks.map((item, index) => (
                  <Task
                    key={item.id}
                    keyID={keyID}
                    taskIndex={index}
                    task={item}
                    tasks={tasks}
                    setTasks={setTasks}
                    setSubtasks={setSubtasks}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
