import { formatDate } from "../../../utils/date";
import { Task, TaskType } from "../Task";
import "./TaskGroup.css";

type Props = {
  date: string;
  tasks: TaskType[];
  taskActions: {
    edit: (task: TaskType) => void;
    remove: (task: TaskType) => void;
    change: (task: TaskType) => void;
  };
};

function getDisplayDate(date: string): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date === formatDate(yesterday)) return "Yesterday";
  if (date === formatDate(new Date())) return "Today";
  if (date === formatDate(tomorrow)) return "Tomorrow";
  return date;
}

export function TaskGroup({ date, tasks, taskActions }: Props) {
  return (
    <div className="task-group">
      <div className="date">
        <div className="date-full">{date}</div>
        <div className="date-title">{getDisplayDate(date)}</div>
      </div>

      <div className="tasks-box">
        <div className="tasks">
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                onRemove={() => taskActions.remove(task)}
                onEdit={() => taskActions.edit(task)}
                onChange={taskActions.change}
                className="tasks-task"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
