import { useDispatch, useSelector } from "react-redux";
import MainPageBtn from "../../components/mainPageBtn/MainPageBtn";
import styles from "./AllSales.module.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/slices/productSlice";
import upIcon from "../../assets/images/upIcon.png";
import downIcon from "../../assets/images/downIcon.svg";
import { useNavigate } from "react-router-dom";

function AllSales() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const [saleProducts, setSaleProducts] = useState([]);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const discountedProducts = products.filter(
      (product) =>
        product.discont_price !== null && product.discont_price < product.price
    );

    let updatedProducts = [...discountedProducts];

    if (priceFrom !== "" || priceTo !== "") {
      updatedProducts = updatedProducts.filter((product) => {
        const price = product.discont_price;
        return (
          (priceFrom === "" || price >= priceFrom) &&
          (priceTo === "" || price <= priceTo)
        );
      });
    }

    switch (sortValue) {
      case "newest":
        updatedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "highToLow":
        updatedProducts.sort((a, b) => b.discont_price - a.discont_price);
        break;
      case "lowToHigh":
        updatedProducts.sort((a, b) => a.discont_price - b.discont_price);
        break;
      default:
        break;
    }

    setSaleProducts(updatedProducts);
  }, [priceFrom, priceTo, products, sortValue]);

  function handleSortChange(event) {
    setSortValue(event.target.value);
  }

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const navigateProduct = useNavigate();

  const handleProductClick = (id) => {
    navigateProduct(`/products/${id}`);
  };

  return (
    <div className={styles.allProductsDiv}>
      <MainPageBtn />
      <button className={styles.allProductsBtn}>All sales</button>
      <p className={styles.allProductsTitle}>Discounted items</p>
      <div className={styles.inputsSorted}>
        <div className={styles.allInputs}>
          <p className={styles.priceText}>Price</p>
          <input
            type="text"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
        <div className={styles.span}>
          <label>Sorted </label>
          <select
            className={styles.priceSort}
            onChange={handleSortChange}
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
      <div className={styles.saleDiv}>
        {status === "loading" && <p className={styles.loading}>Loading...</p>}
        {status === "succeeded" &&
          saleProducts.map((product) => (
            <div key={product.id} className={styles.product}>
              <img
                className={styles.saleImg}
                src={`http://localhost:3333${product.image}`}
                alt={product.title} 
                onClick={() => handleProductClick(product.id)}
              />
              <button className={styles.addToCartBtn}>Add to Cart</button>
              <div className={styles.percentDiv}>
                <p>
                  -
                  {calculateDiscountPercent(
                    product.price,
                    product.discont_price
                  )}
                  %
                </p>
              </div>
              <h3 className={styles.productName}>{product.title}</h3>
              <div className={styles.price}>
                <p className={styles.dscPrice}>${product.discont_price}</p>
                <p className={styles.originalPrice}>${product.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllSales;
const calculateDiscountPercent = (originalPrice, discountPrice) => {
  return (((originalPrice - discountPrice) / originalPrice) * 100).toFixed(0);
};
