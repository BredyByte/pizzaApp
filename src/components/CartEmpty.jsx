import cartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>The cart is empty <span>☹️</span> </h2>
      <p>Probably you haven't placed an order yet</p>
      <img src={cartEmptyImg} alt="The Cart is Empty"/>
      <Link className="button button--black" to="/">
        <span>Go back</span>
      </Link>
    </div>
  );
}

export default CartEmpty
