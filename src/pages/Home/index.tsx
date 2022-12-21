import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { api } from "../../services/api";
import { Container, Carts, CartItem } from "./styles";
import {formatCurrency} from '../../utils/formatCurrency'
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {
  const [products, setProducts] = useState<ProductFormatted[]>([])
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>('/products')

      const productsFormatted = data.map(product => {
        return {...product, priceFormatted: formatCurrency(product.price)}
      })
      
      setProducts(productsFormatted)
    }


    loadProducts()
  }, [])

  function handleAddProductToCart(product: Product){
    return;
  }

  return (
    <Container>
      <Carts>
        {products.map(product => (
          <CartItem key={product.id}>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <strong>{product.priceFormatted}</strong>
            <button>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                <span className="cart-quantity">0</span>
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </CartItem>
        ))}
      </Carts>
    </Container>
  )
}