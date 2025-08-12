import { Resize } from "../../../ui/resize/Resize";
import { formatDate } from "../../../utils/date";
import { Task, TaskType } from "../Task";
import "./TaskGroup.css";

type Props = {
  id?: string;
  date: string;
  tasks: TaskType[];
  taskActions: {
    edit: (task: TaskType) => void;
    remove: (task: TaskType) => void;
    change: (task: TaskType) => void;
  };
};
//TODO make streak function, auto delete old tasks, statistic function, settings???, theme selection,
function getDisplayDate(date: string): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const currentDate = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date === formatDate(yesterday)) return "Yesterday";
  if (date === formatDate(currentDate)) return "Today";
  if (date === formatDate(tomorrow)) return "Tomorrow";
  if (date < formatDate(currentDate)) {
    const diffTime =
      currentDate.setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days Ago`;
  }
  if (date > formatDate(currentDate)) {
    const diffTime =
      new Date(date).setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return `In ${diffDays} Days`;
  }
  return date;
}

export function TaskGroup({ date, tasks, taskActions, id }: Props) {
  return (
    <div className="task-group" id={id}>
      <div className="date">
        <div className="date-full">{date}</div>
        <div className="date-title">{getDisplayDate(date)}</div>
      </div>

      <div className="tasks-box">
        <div className="tasks">
          <Resize>
            {tasks.length === 0 && (
              <div className="no-tasks">Nothing here yet</div>
            )}
          </Resize>

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
