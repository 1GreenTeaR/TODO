import { useLayoutEffect, useState } from "react";
import { Button } from "../../ui/button/Button";
import { Icon } from "../../ui/icon/Icon";
import { formatDate } from "../../utils/date";
import { TaskType } from "../task/Task";

import "./Panel.css";

type Props = {
  a: (task: Omit<TaskType, "id">) => void;
};

export function Panel({ a }: Props) {
  const [theme, setTheme] = useState("dark");

  useLayoutEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <>
      <div className="action-board">
        <div className="button-container" style={{ gap: 10 }}>
          {/* <Button size="xl" className="settings" color="regular">
          st
        </Button> */}
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
          {/* <Button size="xl" className="settings" color="regular">
          se
        </Button> */}
        </div>
      </div>
      <div className="theme-panel">
        <div className="theme-board">
          <Button
            size="m"
            className="theme-button"
            color="regular"
            padding="none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Icon name={theme === "dark" ? "moon" : "sun"}></Icon>
          </Button>
        </div>
      </div>
    </>
  );
}
