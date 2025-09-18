import { h, type Component, type VNode } from "../shared/v-node";

type HeaderProps = {
  menu: VNode | string;
};

export const Header: Component<HeaderProps> = (props = { menu: "" }) => {
  return h("header", { class: "header" }, props.menu);
};
