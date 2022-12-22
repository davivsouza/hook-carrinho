import logo from '../../assets/logo.svg'
import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from "./styles";
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';


export function Header() {
  const {cart} = useCart()
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>
      <Cart to="/cart">
        <MdShoppingBasket size={36} color="#FFF" />
        <span>
          {cart.length === 1 ? `${cart.length} item` : `${cart.length} itens`}
        </span>
      </Cart>
    </Container>
  )
}