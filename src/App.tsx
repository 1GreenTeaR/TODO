import { useEffect, useState } from "react";
import { Task, TaskType } from "./components/task/Task";
import "./App.css";
import { Button } from "./ui/button/Button";
import { Icon } from "./ui/icon/Icon";
import { Modal } from "./ui/modal/Modal";
import { TaskEdit } from "./components/task/edit/TaskEdit";
import { LocalStorage } from "./utils/localstorage";
import { Panel } from "./components/panel/Panel";
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
    isDone: false,
  },
  { id: 2, title: "title2", description: "test2", isDone: false },
  { id: 3, title: "title3", description: "test3", isDone: false },
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
  return (
    <>
      <div className="app-container">
        <div className="tasks-box">
          {list.length !== 0 && (
            <div className="tasks">
              {list.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    onRemove={() => removeTask(task)}
                    onEdit={() => setCurrentTask(task)}
                    onChange={(changedTask) =>
                      setList(
                        list.map((e) =>
                          e.id === changedTask.id ? changedTask : e
                        )
                      )
                    }
                    className="tasks-task"
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* <div className="action-board">
          <div className="button-container" style={{ gap: 10 }}>
            <Button
              onClick={() =>
                setCurrentTask({
                  title: "test",
                  description: "test2",
                  isDone: false,
                })
              }
              color="primary"
              size="xl"
            >
              <Icon name="plus" />
            </Button>
          </div>
        </div> */}
        <Panel a={setCurrentTask}></Panel>
        {currentTask !== null && (
          <Modal
            shouldReserveSpaceForCloseButton={true}
            onClose={() => setCurrentTask(null)}
          >
            <TaskEdit task={currentTask} onChange={onChange} />
          </Modal>
        )}
      </div>
    </>
  );
}
