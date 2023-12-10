import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/images/logo.svg";
import backet from "../../assets/images/backet.svg";


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
          <div className={styles.count}><span>0</span></div>
        </button>
      </div>
      
     
    
    </div>
   
    </>
  );
}

export default Nav;