import { Store } from "./store";

type CounterStore = {
  count: number;
};

export const counterStore = new Store<CounterStore>({ count: 0 });
