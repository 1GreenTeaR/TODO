import { Button } from "../../ui/button/Button";
import "./Task.css";
import { Icon } from "../../ui/icon/Icon";
import { useEffect, useState } from "react";
import { Resize } from "../../ui/resize/Resize";

export type TaskType = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
};

type Props = {
  task: TaskType;
  onRemove?: () => void;
  onEdit?: () => void;
  onTitleChange?: (newTitle: string) => void;
  className?: string;
  onChange: (task: TaskType) => void;
};

export function Task(props: Props) {
  const [isRemovingStep, setIsRemovingStep] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);

  function remove() {
    if (isRemovingStep === 0) {
      setIsRemovingStep(1);
      return;
    }
    if (isRemovingStep === 1) {
      setIsRemovingStep(2);
      setTimeout(() => {
        setIsRemovingStep(3);
        setTimeout(() => {
          setIsRemovingStep(4);
        }, 300);
      }, 700);
    }
  }

  useEffect(() => {
    if (isRemovingStep === 4) props.onRemove?.();
  }, [isRemovingStep]);

  useEffect(() => {
    if (!isMouseIn && isRemovingStep === 1) {
      const timeout = setTimeout(() => setIsRemovingStep(0), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isMouseIn, isRemovingStep]);

  return (
    <Resize>
      {isRemovingStep !== 3 && (
        <div className={`task-container ${props.className ?? ""}`}>
          <div
            className={`task ${isRemovingStep ? "removing" : ""} ${
              isRemovingStep >= 2 ? "removed" : ""
            } ${props.task.isDone ? "done" : ""}`}
            onMouseEnter={() => setIsMouseIn(true)}
            onMouseLeave={() => setIsMouseIn(false)}
          >
            <div className={`task-body`}>
              <div
                className="task-indicator-container"
                onClick={() => {
                  let taskCopy = {
                    ...props.task,
                    isDone: !props.task.isDone,
                  };
                  props.onChange(taskCopy);
                }}
              >
                <div className="task-indicator"></div>
              </div>

              <div>
                <div className="task-title">{props.task.title}</div>
                <div className="task-description">{props.task.description}</div>
              </div>
            </div>
            <div className="task-buttons">
              <Button
                size="m"
                color="regular-transparent"
                padding="none"
                onClick={props.onEdit}
                className="button-edit"
              >
                <Icon name="pencil" />
              </Button>
              <Button
                onClick={remove}
                size="m"
                color="regular-transparent"
                padding="none"
                className="remove-button"
              >
                <Icon name="trash" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Resize>
  );
}
