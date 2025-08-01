import { Button } from "../../ui/button/Button";
import { Icon } from "../../ui/icon/Icon";
import { formatDate } from "../../utils/date";
import { TaskType } from "../task/Task";

import "./Panel.css";

type Props = {
  a: (task: Omit<TaskType, "id">) => void;
};

export function Panel({ a }: Props) {
  return (
    <div className="action-board">
      <div className="button-container" style={{ gap: 10 }}>
        <Button
          onClick={() =>
            a({
              title: "test",
              description: "test2",
              date: formatDate(new Date()),
              isDone: false,
            })
          }
          color="primary"
          size="xl"
        >
          <Icon name="plus" />
        </Button>
        <Button size="xl" className="settings" color="primary"></Button>
      </div>
    </div>
  );
}
