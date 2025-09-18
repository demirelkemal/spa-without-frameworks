import { h, type Component, type VNode, type Props } from "../shared/v-node";

interface ButtonProps extends Omit<Props<"button">, "children"> {
  children: VNode | string;
}

export const Button: Component<ButtonProps> = (props = { children: "" }) => {
  const { children, ...otherProps } = props;
  return h("button", otherProps, children);
};
