type Listener<E> = (payload: E) => void;

export class EventBus<E extends Record<string, any>> {
  private listeners: { [K in keyof E]?: Listener<E[K]>[] } = {};

  on<K extends keyof E>(event: K, listener: Listener<E[K]>) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }

  off<K extends keyof E>(event: K, listener: Listener<E[K]>) {
    const arr = this.listeners[event];
    if (!arr) return;
    this.listeners[event] = arr.filter((l) => l !== listener);
  }

  emit<K extends keyof E>(event: K, payload: E[K]) {
    const arr = this.listeners[event];
    if (!arr) return;
    arr.forEach((l) => l(payload));
  }
}
