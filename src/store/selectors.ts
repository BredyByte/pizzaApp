import {RootState} from "./store";

const selectors = {
  cartSelector: (state:RootState) => state.cart,
  filterSelector: (state:RootState) => state.filter,
  pizzaSelector: (state:RootState) => state.pizza,
  cartItemByIdSelector: (id: string) => (state:RootState) => state.cart.items.find(obj => obj.id === id),
};

export default selectors;