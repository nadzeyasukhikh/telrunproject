import { useNavigate } from "react-router-dom";
import mainBack from "../../assets/images/mainBack.svg"
import styles from "./MainPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { EffectCoverflow, Pagination } from 'swiper/modules';
import DiscountForm from "../../components/DiscountForm";

function MainPage(){
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const status = useSelector(state => state.categories.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories())
        }
    },[status, dispatch])
    const backgroundStyle = {
        backgroundImage: `url(${mainBack})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
      };
      const navigateMain = useNavigate()
    return(
        <>
        <div style={backgroundStyle}>
            <h1 className={styles.mainTitle}>Amazing Discounts on Garden Products!</h1>
            <button className={styles.mainBtn}>Check out</button>
        </div>
        <div className={styles.categoriesDiv}>
            <h2 className={styles.categoriesTitle}>Categories</h2>
            <div className={styles.categoriesBar}></div>
            <button className={styles.categoriesBtn} onClick={() => {navigateMain("/categories")}}>All categories </button>
        </div>
        <div className={styles.swipperDiv}>
            <Swiper 
           effect={'coverflow'}
           grabCursor={true}
           centeredSlides={true}
           slidesPerView={2}
           spaceBetween={20}
           loop={true} 
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className={styles.mySwipper}>
                {categories.map(category => (
                    <SwiperSlide key={category.id}>
                        <img className={styles.categoriesImg} src={`http://localhost:3333${category.image}`} alt={category.title} />
                        <p className={styles.swipperTitle}>{category.title}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <DiscountForm />
        </>
    )
}
export default MainPage