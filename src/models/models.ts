export interface TaskProps {
  id: number;
  task: string;
  status: boolean;
  subtasks: Array<SubtaskProps>;
}
export interface SubtaskProps {
  id: number;
  subtask: string;
  status: boolean;
}
