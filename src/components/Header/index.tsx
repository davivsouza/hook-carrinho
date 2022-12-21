import logo from '../../assets/logo.svg'
import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from "./styles";
import { Link } from 'react-router-dom';


export function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>
      <Cart to="/cart">
        <MdShoppingBasket size={36} color="#FFF" />
        <span>
          0 items
        </span>
      </Cart>
    </Container>
  )
}