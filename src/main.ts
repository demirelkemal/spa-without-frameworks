import { router } from "./router";
import { counterStore } from "./shared/counter-store";
import { render } from "./shared/v-node";

import "./style.css";

const app = document.getElementById("app");

async function update() {
  if (!app) {
    throw new Error("app is not defined");
  }
  const vnode = await router(window.location.pathname);
  render(vnode, app);
}

window.addEventListener("popstate", update);

update();
counterStore.subscribe((state) => {
  update();
});
