interface props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const TaskForm: React.FC<props> = ({ task, setTask, handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className=""
    >
      <input
        className="w-1/3 rounded-md border-2 px-4 py-1 mr-5"
        type="text"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        name="task"
        placeholder="Add new task"
      />
      <button
        className="px-6 py-1 text-medium rounded-md border-2 border-primary bg-primary text-white hover:bg-primary/60 active:bg-primary/80 dark:bg-black dark:text-primary dark:hover:text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
