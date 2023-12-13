import { useDispatch, useSelector } from "react-redux";
import styles from "./FilledShoppingCart.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeFromCart } from "../../store/slices/productSlice";
import iconX from "../../assets/images/iconX.svg"
import minus from "../../assets/images/minus.svg"
import plus from "../../assets/images/plus.svg"


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

    

    const increaseQuantity = (id) => {
        dispatch(increaseCartItemQuantity(id));
    };
    
    const decreaseQuantity = (id) => {
        dispatch(decreaseCartItemQuantity(id));
    };

  

    

    const navigateProduct = useNavigate();

  const handleProductClick = (id) => {
    navigateProduct(`/products/${id}`);
  };

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
                        <img className={styles.cartImg} 
                        src={`http://localhost:3333${item.image}`} 
                        alt={item.title} 
                        onClick={() => handleProductClick(item.id)}
                        />
                        <div>
                            <div className={styles.titleDltBtn}>
                        <p className={styles.title}>{item.title}</p>
                        <button className={styles.deleteBtn} onClick={() => handleRemove(item.id)}><img src={iconX} alt="X"/></button>
                        </div>
                        <div className={styles.priceBtnDiv}>
                            <div className={styles.btnSpan}>
                            <button className={styles.plusMinusBtn} 
                            onClick={() => decreaseQuantity(item.id)}
                            ><img src={minus} alt="-"/></button>
                            <div className={styles.span}>{item.quantity}</div>
                            <button className={styles.plusMinusBtn} 
                            onClick={() => increaseQuantity(item.id)}
                            ><img src={plus} alt="+"/></button>
                            </div>
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