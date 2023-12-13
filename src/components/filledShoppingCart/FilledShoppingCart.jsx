import { useDispatch, useSelector } from "react-redux";
import styles from "./FilledShoppingCart.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../store/slices/productSlice";

function FilledShoppingCart(){
    const cartItems = useSelector((state) => state.products.cartItems);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }


    return (
        <div className={styles.filledShopping}>
            <div className={styles.titleBtn}>
                <h3 className={styles.cartTitle}>Shopping cart</h3>
                <div className={styles.titleBtnBar}></div>
                <button className={styles.backToStoreBatn} onClick={() => navigate("/")}>Back to the store</button>
            </div>
            <div className={styles.flexDiv}>
            <div className={styles.cartOrderDiv}>
            {
                cartItems.map((item) => (
                    <div key={item.id} className={styles.cartInfoDiv}>
                        <img className={styles.cartImg} src={`http://localhost:3333${item.image}`} alt={item.title}/>
                        <div>
                            <div className={styles.titleDltBtn}>
                        <h3>{item.title}</h3>
                        <button className={styles.deleteBtn} onClick={() => handleRemove(item.id)}>X</button>
                        </div>
                        <div>
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                            <p>${item.discont_price ? item.discont_price : item.price}</p>
                            {item.discont_price && ( <p>${item.price}</p>)}
                        </div>
                        </div>
                        
                    </div>
                ))
            }
            
            </div>
            <div className={styles.orderDiv}>
                <p>Order details</p>
                <p>Items</p>

            </div>
            </div>
        </div>
    )
}

export default FilledShoppingCart