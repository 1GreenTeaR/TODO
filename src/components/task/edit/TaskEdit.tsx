import { useState } from "react";
import { Button } from "../../../ui/button/Button";
import { InputText } from "../../../ui/input/text/InputText";
import type { TaskType } from "../Task";

import "./TaskEdit.css";
import { InputDate } from "../../../ui/input/date/InputDate";

type Props = {
  task: Omit<TaskType, "id"> & { id?: number };
  onChange: (task: TaskType | Omit<TaskType, "id">) => void;
};

export function TaskEdit({ task, onChange }: Props) {
  const [taskEdit, setTaskEdit] = useState(task);
  console.log(task);

  function onEdit(value: string, field: keyof Omit<TaskType, "id" | "isDone">) {
    console.log("onEdit", value, field);
    const newTask = { ...taskEdit };
    newTask[field] = value;
    setTaskEdit(newTask);
  }
  return (
    <div className="task-edit">
      <InputText
        title="Title"
        onChange={(value) => onEdit(value, "title")}
        value={taskEdit.title}
      ></InputText>
      <InputText
        title="Description"
        onChange={(value) => onEdit(value, "description")}
        value={taskEdit.description}
      ></InputText>
      <InputDate
        title="Date"
        value={taskEdit.date}
        onChange={(value) => {
          onEdit(value, "date");
        }}
      ></InputDate>
      <Button color="primary" size="xl" onClick={() => onChange(taskEdit)}>
        {taskEdit.id ? "Edit" : "Create"}
      </Button>
    </div>
  );
}
