import { Container, ProductTable, Total } from './styles';

import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';


export function Cart() {
  const { cart,removeProduct, updateAmount } = useCart()
  const cartFormatted = cart.map(product => {
    return {
      ...product, 
      subTotal: formatCurrency(product.price * product.amount), 
      priceFormatted: formatCurrency(product.price)
    }
  })

  const cartTotal = cart.reduce((sumTotal, product) => {
    return sumTotal += product.price * product.amount
  }, 0)

  function handleProductIncrement(productId:number, amount: number){
    updateAmount(productId, amount)
  }

  function handleProductDecrement(productId:number, amount: number){
    updateAmount(productId, amount)
  }

  function handleRemoveProduct(productId:number){
    removeProduct(productId)
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => (
            <tr data-testid="product" key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product.id, -1)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product.id, 1)}

                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatCurrency(cartTotal)}</strong>
        </Total>
      </footer>
    </Container>
  );
};
