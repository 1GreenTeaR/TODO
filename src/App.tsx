import { useEffect, useMemo, useState } from "react";
import { Task, TaskType } from "./components/task/Task";
import "./App.css";
import { Modal } from "./ui/modal/Modal";
import { TaskEdit } from "./components/task/edit/TaskEdit";
import { LocalStorage } from "./utils/localstorage";
import { Panel } from "./components/panel/Panel";
import { TaskGroup } from "./components/task/group/TaskGroup";
// import { TextInput } from "./inputs/Text";

function isExcistingTask(
  task: TaskType | Omit<TaskType, "id">
): task is TaskType {
  return Boolean((task as TaskType).id);
}

const defaultList = [
  {
    id: 1,
    title: "Clean Room",
    description: "test",
    date: "2025.07.30",
    isDone: false,
  },
  {
    id: 2,
    title: "title2",
    description: "test2",
    date: "2025.07.30",
    isDone: false,
  },
  {
    id: 3,
    title: "title3",
    description: "test3",
    date: "2025.07.31",
    isDone: false,
  },
];

export function App() {
  const [list, setList] = useState<TaskType[]>(
    JSON.parse(LocalStorage.get("tasks", JSON.stringify(defaultList)))
  );
  // const [isVisible, setIsVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<
    (Omit<TaskType, "id"> & { id?: number }) | null
  >(null);

  function addTask(task: Omit<TaskType, "id">) {
    setList([...list, Object.assign(task, { id: Date.now() })]);
  }

  function editTask(task: TaskType) {
    setList(list.map((e) => (e.id === task.id ? task : e)));
  }

  function onChange(task: TaskType | Omit<TaskType, "id">) {
    if (isExcistingTask(task)) editTask(task);
    else addTask(task);
    setCurrentTask(null);
  }
  useEffect(() => {
    LocalStorage.set("tasks", list);
  }, [list]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function removeTask(task: any) {
    setList(list.filter((t) => t !== task));
  }

  const { tasksByDate, dates } = useMemo(() => {
    const tasksByDate: { [key: string]: TaskType[] } = {};

    for (let i = 0; i < list.length; i++) {
      const task = list[i];
      if (!tasksByDate[task.date]) tasksByDate[task.date] = [];
      tasksByDate[task.date].push(task);
    }

    const dates = Object.keys(tasksByDate).sort();

    return { tasksByDate, dates };
  }, [list]);

  // onRemove={() => removeTask(task)}
  // onEdit={() => setCurrentTask(task)}
  // onChange={(changedTask) =>
  //   setList(
  //     list.map((e) => (e.id === changedTask.id ? changedTask : e))
  //   )
  // }

  return (
    <>
      <div className="app-container">
        <div className="container-start">Start of your TODO journey!</div>
        {dates.map((date) => (
          <TaskGroup
            date={date}
            tasks={tasksByDate[date]}
            taskActions={{
              remove: removeTask,
              change: (changedTask) => {
                setList(
                  list.map((e) => (e.id === changedTask.id ? changedTask : e))
                );
              },
              edit: setCurrentTask,
            }}
          ></TaskGroup>
        ))}

        <Panel a={setCurrentTask}></Panel>
        {currentTask !== null && (
          <Modal
            shouldReserveSpaceForCloseButton={true}
            onClose={() => setCurrentTask(null)}
          >
            <TaskEdit task={currentTask} onChange={onChange} />
          </Modal>
        )}
        <div className="container-end">That's the end of your journey :c</div>
      </div>
    </>
  );
}
