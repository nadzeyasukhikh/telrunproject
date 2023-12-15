import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { sendOrder, setShowModal } from "../../store/slices/orderSlice";
import styles from "./OrderForm.module.css"
import { clearCart } from "../../store/slices/productSlice";
import modalBtn from "../../assets/images/modalBtn.svg"


function OrderForm(){

    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.order.showModal)

    const {
        register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data) => {
        dispatch(sendOrder(data));
        reset();
        setIsSubmitted(true);
        
    };
    const clearCartAndStorage = useCallback(() => {
      dispatch(clearCart());
      localStorage.removeItem('cartItems');
  }, [dispatch]);

    useEffect(() => {
      if (showModal) {
        const timer = setTimeout(() => {
            dispatch(setShowModal(false));
            clearCartAndStorage();
        }, 5000);
        return () => clearTimeout(timer);
    }
    }, [showModal, dispatch, clearCartAndStorage])
    return(
      <>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input 
            type="text" 
            placeholder="Name" 
            {...register("name", { required: true })}
            className={errors.name ? styles.inputError : ""}
            />
            {errors.name && (
            <p className={`${styles.error} ${styles.errorName}`}>
              This field is required
            </p>
          )}
            <br/>
            <input 
            type="text" 
            placeholder="Phone number"
            {...register("phone", { required: true, pattern: /^\+\d+$/ })}
            className={errors.phone ? styles.inputError : ""}
            />
            {errors.phone && (
            <p className={`${styles.error} ${styles.errorPhone}`}>
              Please enter a valid phone number
            </p>
          )}
            <br/>
            <input 
            type="text" 
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={errors.email ? styles.inputError : ""}
            />
            {errors.email && (
            <p className={`${styles.error} ${styles.errorEmail}`}>
              Please enter a valid email
            </p>
          )}
            <br/>
            <button className={styles.orderBtn}>{isSubmitted ? "Ordered" : "Order" }</button>
        </form>
        <div>
          {showModal && (
            <div className={styles.modalDiv}>
              <div className={styles.modalWindow}>
                <div className={styles.textBtn}>
              <p className={styles.modalTitle}>Congratulations! </p>
              <button className={styles.modalBtn} onClick={() => {dispatch(setShowModal(false)); clearCartAndStorage()}}>
               <img src={modalBtn} alt="delete"/>
              </button>
              </div>
                
                <p className={styles.modalText}>
                Your order has been successfully placed on the website.
                </p>
                <p className={styles.modalText}>A manager will contact you shortly to confirm your order.</p>
              </div>
            </div>
          )}
        </div>
        </>
    )
}

export default OrderForm