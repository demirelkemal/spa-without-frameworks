import { Button } from "../components/button";
import { Counter } from "../components/counter";
import { h } from "../shared/v-node";

export function HomePage() {
  return h(
    "div",
    { class: "home" },
    h("a", { href: "/login", "data-link": "" }, "Go to login"),
    h("button", { class: "btn", onclick: () => alert("click") }, "Click me"),
    Button({
      children: "Нажми на компонент",
      onclick: () => alert("Нажали на компонент!"),
      class: "btn-component",
    }),
    Counter()
  );
}
