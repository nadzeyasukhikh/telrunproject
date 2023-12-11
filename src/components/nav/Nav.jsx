import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/images/logo.svg";
import backet from "../../assets/images/backet.svg";
import { useSelector } from "react-redux";


function Nav() {
  const navigate = useNavigate()
  const shoppingCartNavigate = useNavigate()
  const cartItems = useSelector((state) => state.products.cartItems);
  const cartItemCount = new Set(cartItems.map(item => item.id)).size;
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
        <button className={styles.btn} onClick={() => {shoppingCartNavigate("/shoppingCart/:id")}}>
          <img className={styles.btnImg} src={backet} alt="Basket"/>
          <div className={styles.count}><span>{isNaN(cartItemCount) ? 0 : cartItemCount}</span></div>
        </button>
      </div>
      
     
    
    </div>
   
    </>
  );
}

export default Nav;