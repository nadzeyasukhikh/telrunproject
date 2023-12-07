import { useParams } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productSlice";
import MainPage from "../../components/mainPageBtn/MainPageBtn";

function ProductCard() {
  const { id: stringId } = useParams();
  const id = parseInt(stringId, 10);
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.products.products.find((p) => p.id === id)
  );

  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.productCardDiv}>
      {status === "loading" && <p className={styles.loading}>Loading...</p>}
      {status === "succeeded" && (
        <div key={products.id}>
          <div className={styles.allBtn}>
            <MainPage />
            <button className={styles.categoriesBtn}>Categories</button>
            <button className={styles.toolsBtn}>Tools and equipment</button>
            <button className={styles.btnTitle}>{products.title}</button>
          </div>
          <div className={styles.productsInfo}>
            <img
              className={styles.productCardImg}
              src={`http://localhost:3333${products.image}`}
              alt={products.title}
            />
            <div>
              <h3 className={styles.productTitle}>{products.title}</h3>
              <div className={styles.priceInfo}>
                {products.discont_price ? (
                  <p className={styles.priceText}>${products.discont_price}</p>
                ) : (
                  <p>{products.price}</p>
                )}
                {products.discont_price && (
                  <p className={styles.discountText}>${products.price}</p>
                )}
                <div className={styles.positionDiv}>
                  {products.discont_price && (
                    <div className={styles.percentDiv}>
                      <p className={styles.percentText}>
                        -
                        {calculateDiscountPercent(
                          products.price,
                          products.discont_price
                        )}
                        %
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
const calculateDiscountPercent = (originalPrice, discountPrice) => {
  return (((originalPrice - discountPrice) / originalPrice) * 100).toFixed(0);
};
