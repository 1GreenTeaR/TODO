import { TaskType } from "../components/task/Task";
import { formatDate } from "../utils/date";

function getDate(delta: number): string {
  const date = new Date();
  date.setDate(date.getDate() + delta);
  return formatDate(date);
}

type TaskTypeDummy = Omit<TaskType, "id">;

const today: TaskTypeDummy[] = [
  {
    title: "Morning Yoga",
    description: "Start the day with a 20-minute yoga session.",
    date: getDate(0),
    isDone: true,
  },
  {
    title: "Team Standup",
    description: "Daily sync with the project team at 10:00 AM.",
    date: getDate(0),
    isDone: false,
  },
  {
    title: "Write Portfolio Blog",
    description: "Draft a new blog post about React best practices.",
    date: getDate(0),
    isDone: false,
  },
  {
    title: "Design Review",
    description: "Review new UI mockups for the dashboard.",
    date: getDate(0),
    isDone: true,
  },
  {
    title: "Lunch with Alex",
    description: "Catch up with Alex at the new cafe.",
    date: getDate(0),
    isDone: false,
  },
  {
    title: "Code Refactoring",
    description: "Refactor authentication module for better readability.",
    date: getDate(0),
    isDone: false,
  },
  {
    title: "Evening Walk",
    description: "Take a 30-minute walk in the park.",
    date: getDate(0),
    isDone: false,
  },
];

const previousDays: TaskTypeDummy[] = [
  // Yesterday
  {
    title: "Grocery Shopping",
    description: "Buy vegetables and snacks for the week.",
    date: getDate(-1),
    isDone: true,
  },
  {
    title: "Read Documentation",
    description: "Go through the new API documentation.",
    date: getDate(-1),
    isDone: true,
  },
  // 2 days ago
  {
    title: "Client Call",
    description: "Discuss project requirements with the client.",
    date: getDate(-2),
    isDone: true,
  },
  {
    title: "Fix Bugs",
    description: "Resolve issues reported in the bug tracker.",
    date: getDate(-2),
    isDone: false,
  },
  // 4 days ago
  {
    title: "Write Unit Tests",
    description: "Increase test coverage for the user module.",
    date: getDate(-4),
    isDone: true,
  },
  // 6 days ago
  {
    title: "Plan Sprint",
    description: "Outline tasks and goals for the next sprint.",
    date: getDate(-6),
    isDone: true,
  },
];

const futureDays: TaskTypeDummy[] = [
  {
    title: "Doctor Appointment",
    description: "Annual health checkup at 9:00 AM.",
    date: getDate(1),
    isDone: false,
  },
  {
    title: "Start New Course",
    description: "Begin the online TypeScript course.",
    date: getDate(2),
    isDone: false,
  },
  {
    title: "Birthday Gift Shopping",
    description: "Find a present for Sarah's birthday.",
    date: getDate(3),
    isDone: false,
  },
];

let ID = 0;
const list: TaskType[] = [...previousDays, ...today, ...futureDays].map(
  (task) => {
    (task as TaskType).id = ID++;
    return task as TaskType;
  }
);

export { list as dummyList };
