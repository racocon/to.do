import { TaskProps } from "../src/models/models";

interface props {
  tasks: Array<TaskProps>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskProps>>>;
}

const TaskList: React.FC<props> = ({ tasks, setTasks }) => {
  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: !task.status,
            }
          : task
      )
    );
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left font-semibold"
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

              <tbody className="divide-y divide-light-gray">
                {tasks.map((item) => (
                  <tr key={item.id}>
                    <td className="w-1/5 py-4 pl-6 pr-3 font-medium">
                      {item.id}
                    </td>
                    <td className="w-3/5 px-3 py-4 text-sm">{item.task}</td>
                    <td className="px-3 py-4 text-sm">
                      <button
                        onClick={() => handleDone(item.id)}
                        className={`inline-flex rounded-full px-4 text-sm font-semibold leading-5 ${
                          item.status
                            ? "bg-success/20 text-success"
                            : "bg-alert/20 text-alert"
                        }`}
                      >
                        {item.status ? "Done" : "In Progress"}
                      </button>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-right font-medium sm:pr-6">
                      <a href="#" className="text-primary hover:text-secondary">
                        Edit<span className="sr-only">, {item.task}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
