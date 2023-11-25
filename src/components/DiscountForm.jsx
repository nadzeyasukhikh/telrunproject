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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(old => ({
            ...old,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(sendSaleData(formData));
        setFormData({ name: "", phone: "", email: "" });

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
                /><br></br>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                /><br></br>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                /><br></br>
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