import { h, type Component } from "../shared/v-node";

const menu = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Задачи",
    href: "/tasks",
  },
  {
    title: "Профиль",
    href: "/profile",
  },
];

export const Menu: Component = () => {
  return h(
    "ul",
    { class: "menu-list" },
    ...menu.map((item) =>
      h("li", {}, h("a", { href: item.href, "data-link": "" }, item.title))
    )
  );
};
