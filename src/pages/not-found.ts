import { h } from "../shared/v-node";

export function NotFoundPage() {
  return h("div", { className: "not-found" }, h("h1", {}, "404"));
}
