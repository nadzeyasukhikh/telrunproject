import { Link, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "./images/logo.svg";
import backet from "./images/backet.svg";
import MainPage from "../mainPage/MainPage";
import Categories from "../categories/Categories";
import AllProducts from "../allProducts/AllProducts";
import AllSales from "../allSales/AllSales";
import NotFound from "../notFound/NotFound";

function Nav() {
  const navigate = useNavigate()
  return (
    <>
    <div className={styles.nav}>
      <img className={styles.image} src={logo} alt="Logo" onClick={() => {navigate("/")}} />
      <nav className={styles.link}>
        <Link className={styles.linkstyle} to="/">Main Page</Link>
        <Link className={styles.linkstyle} to="/categories">Categories</Link>
        <Link className={styles.linkstyle} to="/allProducts">All products</Link>
        <Link className={styles.linkstyle} to="/allSales">All sales</Link>
      </nav>
      <div>
        <button className={styles.btn}>
          <img className={styles.btnImg} src={backet} alt="Basket"/>
          <div className={styles.count}><span>12</span></div>
        </button>
      </div>
      
     
    
    </div>
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/allSales" element={<AllSales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Nav;