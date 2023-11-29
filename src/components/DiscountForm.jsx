import { useDispatch, useSelector } from "react-redux"
import icon from "../assets/images/discountIcon.svg"
import styles from "./DiscountForm.module.css"

import { sendSaleData, setShowModal } from "../store/slices/saleSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function DiscountForm(){

    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.sale.showModal);

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const onSubmit = (data) => {
        dispatch(sendSaleData(data));
        reset(); 
        setIsSubmitted(true);
    };
    

    

    

    useEffect(() => {
        if(showModal) {
            const timer = setTimeout(() => dispatch(setShowModal(false)), 5000);
            return () => clearTimeout(timer);  
        }
    },[showModal, dispatch] )

    return(
        <div className={styles.discDiv}>
            <p className={styles.title}>5% off on the first order</p>
            <div className={styles.imgForm}>
                <img src={icon} alt="icon" />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                        className={errors.name ? styles.inputError : ''}
                    />
                    {errors.name && <p className={`${styles.error} ${styles.errorName}`}>This field is required</p>}
                    <br />
                    <input
                        type="text"
                        placeholder="Phone number"
                        {...register("phone", { required: true, pattern: /^\+\d+$/ })}
                        className={errors.phone ? styles.inputError : ''}
                    />
                    {errors.phone && <p className={`${styles.error} ${styles.errorPhone}`}>Please enter a valid phone number</p>}
                    <br />
                    <input
                        type="text"
                        placeholder="Email"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && <p className={`${styles.error} ${styles.errorEmail}`}>Please enter a valid email</p>}
                    <br />
                    <button className={isSubmitted ? styles.submittedDiscountBtn : styles.discountBtn}>{isSubmitted ? "Request Submitted" : "Get a discount"}</button>
                </form>
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <p>Congratulations! A coupon with your discount code has been sent to your email address.</p>
                    <button onClick={() => dispatch(setShowModal(false))}>X</button>
                </div>
            )}
        </div>
)
        }
    

export default DiscountForm