import { h } from "../shared/v-node";

export function TasksPage() {
  return h("div", { className: "tasks" }, h("h1", {}, "tasks"));
}
