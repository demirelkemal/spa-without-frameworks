import { EventBus } from "./event-bus";

interface StoreEvents<T> {
  change: T; // событие "change" всегда передает текущее состояние
  navigate: T;
}

export class Store<T extends object> {
  private state: T;
  private bus = new EventBus<StoreEvents<T>>();

  constructor(initialState: T) {
    this.state = {
      ...initialState,
    };
  }

  getState(): Readonly<T> {
    return this.state;
  }

  setState(newState: Partial<T>) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.bus.emit("change", this.state);
  }

  subscribe(listener: (state: T) => void) {
    this.bus.on("change", listener);
    return () => this.bus.off("change", listener);
  }
}
