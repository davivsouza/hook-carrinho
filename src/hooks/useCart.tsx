import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types/types";



interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateAmount: (productId: number, amount: number) => Promise<void>
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>(() => {

    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []

  })

  async function addProduct(productId: number) {
    try {
      const products = [...cart]

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`)

      const productAlreadyExist = products.find(product => product.id === productId);
      const productAmount = productAlreadyExist ? productAlreadyExist.amount : 0
      // preciso armazenar os valores que estão sendo adicionados para que seja possível fazer a comparação
      // com Stock
      const newAmount = productAmount + 1

      if (newAmount > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque')
        return;
      }

      if (productAlreadyExist) {
        productAlreadyExist.amount = newAmount
      } else {
        const { data: productIfNotExists } = await api.get<Product>(`/products/${productId}`)
        products.push({ ...productIfNotExists, amount: 1 })
      }
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(products))
      setCart(products)

    } catch {
      toast.error('Erro na adição do produto');
    }
  }

  function removeProduct(productId: number) {
    try {
      const products = [...cart]
      const productWillBeDeleted = products.findIndex(product => product.id === productId)
      products.splice(productWillBeDeleted, 1)

      setCart(products)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(products))

    } catch {
      toast.error('Erro na remoção do produto');
    }
  }


  async function updateAmount(
    productId: number,
    amount: number
  ) {
    try {
      const products = [...cart]
      const { data: stock } = await api.get<Stock>(`/stock/${productId}`)
      const updatedProduct = products.find(product => product.id === productId)

      if (updatedProduct) {

        if (updatedProduct.amount <= 0) {
          return
        }

        const newAmount = updatedProduct.amount + amount

        if (newAmount > stock.amount) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
        updatedProduct.amount = newAmount
        
      }

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(products))
      setCart(products)
    }catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      addProduct,
      removeProduct,
      updateAmount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  return context
}