
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './pages/footer/Footer';

import Nav from './pages/nav/Nav';
import MainPage from './pages/mainPage/MainPage';
import Categories from './pages/categories/Categories';
import AllProducts from './pages/allProducts/AllProducts';
import AllSales from './pages/allSales/AllSales';
import NotFound from './pages/notFound/NotFound';
import CategoryProducts from './pages/categoryProducts/CategoryProducts';






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
        
      </Routes>
      
    <Footer /> 
  </>
  );
}
export default App;
