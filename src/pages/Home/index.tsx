import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { api } from "../../services/api";
import { Container, Carts, CartItem } from "./styles";
import {formatCurrency} from '../../utils/formatCurrency'
import { Product } from "../../types/types";
import { useCart } from "../../hooks/useCart";



interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {
  const [products, setProducts] = useState<ProductFormatted[]>([])
  const {addProduct,cart} = useCart()

  const cartItemsAmount = cart.reduce((stockAmount, product)=> {
    stockAmount[product.id] = product.amount
    return stockAmount;
  }, [] as CartItemsAmount) 

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

  function handleAddProductToCart(productId: number){
    addProduct(productId)
  }

  return (
    <Container>
      <Carts>
        {products.map(product => (
          <CartItem key={product.id}>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <strong>{product.priceFormatted}</strong>
            <button onClick={()=>handleAddProductToCart(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                <span className="cart-quantity">{cartItemsAmount[product.id] || 0}</span>
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </CartItem>
        ))}
      </Carts>
    </Container>
  )
}