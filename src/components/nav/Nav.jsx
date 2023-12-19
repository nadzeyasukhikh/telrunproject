import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/images/logo.svg";
import backet from "../../assets/images/backet.svg";
import { useSelector } from "react-redux";
import { useState } from "react";



function Nav() {
  const navigate = useNavigate()
  
  const cartItems = useSelector((state) => state.products.cartItems);
  const cartItemCount = new Set(cartItems.map(item => item.id)).size;
  const [menuOpen, setMenuOpen] = useState(false);
  
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    
    <div className={styles.nav}>
      <img className={styles.image} src={logo} alt="Logo" onClick={() => {navigate("/")}} />
      
      <nav className={`${styles.link} ${menuOpen ? styles.active : ''}`}>
      {styles.active && <button className={styles.menuDeleteBtn} onClick={toggleMenu}>X</button>}
        <Link className={styles.linkstyle} to="/" >Main Page</Link>
        <Link className={styles.linkstyle} to="/categories">Categories</Link>
        <Link className={styles.linkstyle} to="/allProducts" >All products</Link>
        <Link className={styles.linkstyle} to="/allSales" >All sales</Link>
      </nav>
      
      <div className={styles.menuBarBtn}>
      
        <button className={styles.btn} onClick={() => {navigate("/shoppingCart/:id")}}>
          <img className={styles.btnImg} src={backet} alt="Basket"/>
          <div className={styles.count}><span>{isNaN(cartItemCount) ? 0 : cartItemCount}</span></div>
        </button>
        {!menuOpen && <button className={styles.menuButton} onClick={toggleMenu}>☰</button>}
      </div>
      
     
    
    </div>
   
    
  );
}

export default Nav;