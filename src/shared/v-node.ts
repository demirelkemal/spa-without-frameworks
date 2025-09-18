type BaseProps = {
  class?: string;
  className?: string;
  style?: string | Partial<CSSStyleDeclaration>;
  dataset?: Record<string, string>;
  [key: `data-${string}`]: string; // data-link и прочее
  [key: `on${string}`]: (e: Event) => void; // onClick, onInput...
};

export type Props<T extends keyof HTMLElementTagNameMap> = Partial<
  HTMLElementTagNameMap[T]
> &
  BaseProps;

export type Component<P = Record<string, any>> = (props?: P) => VNode;

type HTMLElementTag = keyof HTMLElementTagNameMap;

export type VNode =
  | {
      type: HTMLElementTag;
      props?: Props<keyof HTMLElementTagNameMap>;
      children?: (VNode | string)[];
    }
  | {
      type: Component<any>;
      props?: Record<string, any>;
      children?: (VNode | string)[];
    };

export function setProp<T extends HTMLElement>(
  el: T,
  key: keyof Props<any>, // ключи ограничены нашим Props
  value: any
) {
  if (value == null) return;

  // 🎨 class / className
  if (key === "class" || key === "className") {
    el.setAttribute("class", String(value));
    return;
  }

  // 🎨 style (строка или объект)
  if (key === "style") {
    if (typeof value === "string") {
      el.setAttribute("style", value);
    } else if (typeof value === "object") {
      for (const [styleName, styleValue] of Object.entries(value)) {
        (el.style as any)[styleName] = styleValue;
      }
    }
    return;
  }

  // 🔗 htmlFor → for
  if (key === "htmlFor" || key === "for") {
    el.setAttribute("for", String(value));
    return;
  }

  // 🎯 dataset: { key: value }
  if (key === "dataset" && typeof value === "object") {
    for (const [dataKey, dataValue] of Object.entries(value)) {
      el.dataset[dataKey] = String(dataValue);
    }
    return;
  }

  // 🎯 data-* атрибуты
  if (typeof key === "string" && key.startsWith("data-")) {
    el.setAttribute(key, String(value));
    return;
  }

  // 🎧 события onClick, onInput...
  if (
    typeof key === "string" &&
    key.startsWith("on") &&
    typeof value === "function"
  ) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, value);
    return;
  }

  // 📌 дефолт: всё остальное как атрибут
  el.setAttribute(key as string, String(value));
}

export function h<T extends keyof HTMLElementTagNameMap>(
  type: T,
  props?: Props<T>,
  ...children: (VNode | string)[]
): VNode;

export function h<P>(
  type: Component<P>,
  props?: P,
  ...children: (VNode | string)[]
): VNode;

export function h(
  type: any,
  props: any = {},
  ...children: (VNode | string)[]
): VNode {
  return { type, props, children };
}

export function createElement(vnode: VNode | string): HTMLElement | Text {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  if (typeof vnode.type === "function") {
    const componentNode = vnode.type(vnode.props);
    return createElement(componentNode);
  }

  const el = document.createElement(vnode.type);
  if (vnode.props) {
    for (const [key, value] of Object.entries(vnode.props)) {
      setProp(el, key, value);
    }
  }

  if (vnode.children) {
    vnode.children.forEach((child) => el.appendChild(createElement(child)));
  }

  return el;
}

export function render(vnode: VNode | string, container: HTMLElement) {
  container.innerHTML = "";
  container.appendChild(createElement(vnode));
}
