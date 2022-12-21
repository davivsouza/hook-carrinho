import axios from "axios"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { GlobalStyles } from "./styles/global"

function App() {
  useEffect(() => {
    async function fetchApi() {
      const { data } = await axios.get('http://localhost:3333/products')
    }
    fetchApi()
  }, [])
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
