import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { sendOrder, setShowModal } from "../../store/slices/orderSlice";
import styles from "./OrderForm.module.css"


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
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => dispatch(setShowModal(false)),5000);
            return () => clearTimeout(timer)
        }
    }, [showModal, dispatch])
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
            <button>{isSubmitted ? "Ordered" : "Order" }</button>
        </form>
        <div>
          {showModal && (
            <div className={styles.modalDiv}>
              <div>
              <button onClick={() => dispatch(setShowModal(false))}>X</button>
                <p>Congratulations! </p>
                <p>
                Your order has been successfully placed on the website.
                </p>
                <p>A manager will contact you shortly to confirm your order.</p>
              </div>
            </div>
          )}
        </div>
        </>
    )
}

export default OrderForm