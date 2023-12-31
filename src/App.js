import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";

import Nav from "./components/nav/Nav";
import MainPage from "./pages/mainPage/MainPage";
import Categories from "./pages/categories/Categories";
import AllProducts from "./pages/allProducts/AllProducts";
import AllSales from "./pages/allSales/AllSales";
import NotFound from "./pages/notFound/NotFound";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
import ProductCard from "./pages/productCard/ProductCard";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/allSales" element={<AllSales />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductCard />} />
        <Route path="/shoppingCart/:id" element={<ShoppingCart />}/>
      </Routes>

      <Footer />
    </>
  );
}
export default App;
