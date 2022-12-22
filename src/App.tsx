import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Header } from "./components/Header"
import { CartProvider } from "./hooks/useCart"
import { Home } from "./pages/Home"
import { GlobalStyles } from "./styles/global"
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from "./pages/Cart"

function App() {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </CartProvider>
  )
}

export default App
