import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../store/slices/categoryProductsSlice";
import styles from "./CategoryProducts.module.css";
import { useEffect, useState } from "react";
import MainPageBtn from "../../components/MainPageBtn";
import downIcon from "../../assets/images/downIcon.svg";
import upIcon from "../../assets/images/upIcon.png";

function CategoryProducts() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.categoryProducts.productsByCategory[categoryId]
  );
  const status = useSelector((state) => state.categoryProducts.status);
  const navigate = useNavigate();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [sorting, setSorting] = useState("byDefault");

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, [categoryId, dispatch]);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filteredProducts =
    products &&
    products.data
      .filter((product) => {
        const price = product.discont_price || product.price;
        return (
          (!showDiscounted || product.discont_price) &&
          (!minPrice || price >= minPrice) &&
          (!maxPrice || price <= maxPrice)
        );
      })
      .sort((a, b) => {
        switch (sorting) {
          case "newest":
            return new Date(b.created_at) - new Date(a.created_at);
          case "highToLow":
            return (b.discont_price || b.price) - (a.discont_price || a.price);
          case "lowToHigh":
            return (a.discont_price || a.price) - (b.discont_price || b.price);
          default:
            return 0;
        }
      });
  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const handleShowDiscountedChange = (e) => {
    setShowDiscounted(e.target.checked);
  };

  return (
    <div className={styles.allProductsDiv}>
      <MainPageBtn />
      <button
        className={styles.categoriesBtn}
        onClick={() => {
          navigate("/categories");
        }}
      >
        Categories
      </button>
      <button className={styles.toolsBtn}>Tools and equipment</button>
      <h3 className={styles.categoryProductTitle}>Tools and equipment</h3>
      <div className={styles.allInputs}>
        <div className={styles.priceInputText}>
          <p className={styles.priceText}>Price</p>
          <input
            type="text"
            placeholder="from"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            placeholder="to"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <div className={styles.discountedInput}>
          <p className={styles.discountPar}>Discounted items</p>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={showDiscounted}
            onChange={handleShowDiscountedChange}
          />
        </div>
        <div className={styles.span}>
          <label>Sorted </label>
          <select
            className={styles.priceSort}
            onChange={handleSortingChange}
            onClick={toggleSelect}
            style={{
              backgroundImage: `url(${isSelectOpen ? upIcon : downIcon})`,
            }}
          >
            <option value="byDefault">by default</option>
            <option value="newest">newest</option>
            <option value="highToLow">price: high-low</option>
            <option value="lowToHigh">price: low-high</option>
          </select>
        </div>
      </div>
      <div className={styles.productsDiv}>
        {status === "loading" && <p className={styles.loading}>Loading...</p>}
        {status === "succeeded" &&
          products &&
          filteredProducts.map((product) => {
            let discountText = null;
            if (product.discont_price) {
              const discountPercent =
                ((product.price - product.discont_price) / product.price) * 100;
              discountText = (
                <div className={styles.discountText}>
                  <p>-{discountPercent.toFixed(0)}%</p>
                </div>
              );
            }
            return (
              <div className={styles.productCard} key={product.id}>
                <img
                  className={styles.productImg}
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
                {discountText}
                <button className={styles.addToCartBtn}>Add to Cart</button>
                <div className={styles.productTitlePrice}>
                  <h3 className={styles.productName}>{product.title}</h3>
                  <div className={styles.priceDscPriceDiv}>
                    <p className={styles.price}>
                      {product.discont_price
                        ? "$" + product.discont_price
                        : "$" + product.price}
                    </p>
                    {product.discont_price && (
                      <p className={styles.discountPrice}>${product.price}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CategoryProducts;
