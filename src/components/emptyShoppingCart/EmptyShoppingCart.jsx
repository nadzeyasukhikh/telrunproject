import { useNavigate } from "react-router-dom";
import styles from "./EmptyShoppingCart.module.css"

function EmptyShoppingCart(){

    const navigate = useNavigate();
    const navigateToShop = useNavigate()
    return (
        <div className={styles.emptyDiv}>
            <div className={styles.titleBtn}>
            <h2 className={styles.emptyTitle}>Shopping cart</h2>
            <div className={styles.titleBtnBar}></div>
            <button className={styles.storeBtn} onClick={() => navigate("/")}>Back to the store</button>
            </div>
            <p className={styles.emptyText}>Looks like you have no items in your basket currently.</p>
            <button className={styles.emptyBtn} onClick={() => navigateToShop("/allProducts")}>Continue Shopping</button>
        </div>
    )
}

export default EmptyShoppingCart