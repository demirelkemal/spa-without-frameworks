import type { VNode } from "./shared/v-node.ts";

export async function router(path: string): Promise<VNode> {
  switch (path) {
    case "/":
      const { HomePage } = await import("./pages/home.ts");
      return HomePage();
    case "/tasks":
      const { TasksPage } = await import("./pages/tasks.ts");
      return TasksPage();
    case "/login":
      const { Login } = await import("./pages/login.ts");
      return Login();
    default:
      const { NotFoundPage } = await import("./pages/not-found.ts");
      return NotFoundPage();
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.matches("[data-link]")) {
    e.preventDefault();
    const href = (target as HTMLAnchorElement).getAttribute("href");
    if (href) {
      history.pushState(null, "", href);
      window.dispatchEvent(new Event("popstate"));
    }
  }
});
