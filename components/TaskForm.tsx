export default function TaskForm() {
  return (
    <form>
      <input
        className="px-2"
        type="text"
        name="task"
        placeholder="Add new task"
      />
      <button className="pl-4" type="submit">
        Submit
      </button>
    </form>
  );
}
