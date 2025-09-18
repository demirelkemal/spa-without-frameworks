import { Button } from "../components/button";
import { Counter } from "../components/counter";
import { Header } from "../components/header";
import { Menu } from "../components/menu";
import { h } from "../shared/v-node";

export function HomePage() {
  return h(
    "div",
    { class: "home" },
    Header({
      menu: Menu(),
    }),
    h("a", { href: "/login", "data-link": "" }, "Go to login"),
    h("button", { class: "btn", onclick: () => alert("click") }, "Click me"),
    Button({
      children: "Нажми на компонент",
      onclick: () => alert("Нажали на компонент!"),
      class: "btn-component",
    }),
    Counter(),
    Button({
      children: "Текст",
      onclick: () => alert("Blaaa"),
      class: "btn-example",
    }),
    h("p", { class: "text" }, "lorem ru")
  );
}
