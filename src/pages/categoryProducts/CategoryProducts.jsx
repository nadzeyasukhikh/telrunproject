import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../store/slices/categoryProductsSlice";
import styles from "./CategoryProducts.module.css";
import { useEffect, useState } from "react";
import MainPageBtn from "../../components/mainPageBtn/MainPageBtn";
import downIcon from "../../assets/images/downIcon.svg";
import upIcon from "../../assets/images/upIcon.png";
import { addToCart } from "../../store/slices/productSlice";
import { calculateDiscountPercent } from "../../utils/utils";
import { sortProducts } from "../../utils/sortProducts";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import { fetchCategories } from "../../store/slices/categoriesSlice";

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

  const categoryIdNumber = parseInt(categoryId, 10);
  const categories = useSelector((state) => state.categories.categories);
  const category = categories.find((cat) => cat.id === categoryIdNumber);
  const cartItems = useSelector((state) => state.products.cartItems);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    setDocumentTitle("categoriesProduct")
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(categoryId));
  }, [categoryId, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

 

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  useEffect(() => {
    if (products?.data) {
      let filteredProducts = products.data.filter((product) => {
        const price = product.discont_price || product.price;
        return (
          (!showDiscounted || product.discont_price) &&
          (!minPrice || price >= minPrice) &&
          (!maxPrice || price <= maxPrice)
        );
      });

      filteredProducts = sortProducts(filteredProducts, sorting);
      setFilteredProducts(filteredProducts);
    }
  }, [products, minPrice, maxPrice, showDiscounted, sorting]);
  

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const handleShowDiscountedChange = (e) => {
    setShowDiscounted(e.target.checked);
  };

  const navigateProduct = useNavigate();

  const handleProductClick = (id) => {
    navigateProduct(`/products/${id}`);
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
      <button className={styles.toolsBtn}>{category?.title}</button>
      <h3 className={styles.categoryProductTitle}>{category?.title}</h3>
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
          filteredProducts.map((product) => (
            <div className={styles.productCard} key={product.id}>
              <img
                className={styles.productImg}
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
                onClick={() => handleProductClick(product.id)}
              />
              {product.discont_price && (
                <div className={styles.discountText}>
                  <p>
                    -
                    {calculateDiscountPercent(
                      product.discont_price,
                      product.price
                    )}
                    %
                  </p>
                </div>
              )}
              <button
                className={`${styles.addToCartBtn} ${
                  isProductInCart(product.id) ? styles.addedToCart : ""
                }`}
                onClick={() => handleAddToCart(product)}
              >
                {isProductInCart(product.id) ? "Added" : "Add to Cart"}
              </button>
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
          ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
