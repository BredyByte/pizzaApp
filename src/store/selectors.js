const selectors = {
  cartSelector: state => state.cart,
  filterSelector: state => state.filter,
  pizzaSelector: state => state.pizza,
  cartItemByIdSelector: id => state => state.cart.items.find(obj => obj.id === id),
};

export default selectors;