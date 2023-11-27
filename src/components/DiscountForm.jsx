import { useDispatch, useSelector } from "react-redux"
import icon from "../assets/images/discountIcon.svg"
import styles from "./DiscountForm.module.css"

import { sendSaleData, setShowModal } from "../store/slices/saleSlice";
import { useEffect, useState } from "react";
function DiscountForm(){

    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.sale.showModal);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    })

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(old => ({
            ...old,
            [name]: value
        }));
        if (name === "name" || name === "phone"){
        const newError = validateField(name, value);
        setFormErrors(oldErrors => ({
            ...oldErrors,
            [name]: newError
        }));
    }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!/^[ZA-Za-z]+$/.test(value)) {
                    return "Name must be in English letters only";
                }
                break;
            case 'phone':
                if (!/^\+\d+$/.test(value)) {
                    return "Phone number must start with '+' and include digits";
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    return "Email must be a valid email address";
                }
                break;
            default:
                return '';
        }
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const newError = validateField(name, value);
        setFormErrors(oldErrors => ({
            ...oldErrors,
            [name]: newError
        }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateField();
        if(Object.keys(errors).length === 0){
            dispatch(sendSaleData(formData));
        setFormData({ name: "", phone: "", email: "" });
        setFormErrors({});
        } else {
            setFormErrors(errors)
        }
        

    }

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
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? styles.inputError : ''}
                />
                {formErrors.name && <p className={`${styles.error} ${styles.errorName}`}>{formErrors.name}</p>}
                <br></br>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                     onBlur={handleBlur}
                    className={formErrors.phone ? styles.inputError : ''}
                />
                {formErrors.phone && <p className={`${styles.error} ${styles.errorPhone}`}>{formErrors.phone}</p>}
                <br></br>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formErrors.email ? styles.inputError : ''}
                />
                {formErrors.email && <p className={`${styles.error} ${styles.errorEmail}`}>{formErrors.email}</p>}
                <br></br>
                <button className={styles.discountBtn}>Get a discount</button>
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