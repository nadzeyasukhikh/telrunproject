import { useNavigate } from "react-router-dom";
import mainBack from "../../assets/images/mainBack.svg";
import styles from "./MainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import DiscountForm from "../../components/discountForm/DiscountForm";
import SaleComponent from "../../components/saleComponent/SaleComponent";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

function MainPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    setDocumentTitle("home")
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  const backgroundStyle = {
    backgroundImage: `url(${mainBack})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  
  const saleComponentRef = useRef(null);

  const scrollToSaleComponent = () => {
    saleComponentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <>
      <div style={backgroundStyle}>
        <h1 className={styles.mainTitle}>
          Amazing Discounts on Garden Products!
        </h1>
        <button className={styles.mainBtn} onClick={scrollToSaleComponent}>
          Check out
        </button>
      </div>
      <div className={styles.categoriesDiv}>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <div className={styles.categoriesBar}></div>
        <button
          className={styles.categoriesBtn}
          onClick={() => {
            navigate("/categories");
          }}
        >
          All categories{" "}
        </button>
      </div>
      <div className={styles.swipperDiv}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <img
              className={styles.categoriesImg}
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
              onClick={() => {
                handleCategoryClick(category.id);
              }}
            />
            <p className={styles.swipperTitle}>{category.title}</p>
          </div>
        ))}
      </div>
      <DiscountForm />
      <div ref={saleComponentRef}>
        <SaleComponent />
      </div>
    </>
  );
}
export default MainPage;
