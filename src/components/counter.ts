import { counterStore } from "../shared/counter-store";
import { h, type Component } from "../shared/v-node";
import { Button } from "./button";

export const Counter: Component = () => {
  const state = counterStore.getState();

  const increment = () => counterStore.setState({ count: state.count + 1 });
  const decrement = () => counterStore.setState({ count: state.count - 1 });

  return h(
    "div",
    { class: "counter" },
    Button({ children: "+", onclick: increment }),
    h("span", {}, state.count.toString()),
    Button({ children: "-", onclick: decrement })
  );
};
