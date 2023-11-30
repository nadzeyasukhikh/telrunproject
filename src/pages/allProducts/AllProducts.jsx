import { useDispatch, useSelector } from "react-redux"
import MainPageBtn from "../../components/MainPageBtn"
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/slices/productSlice";
import styles from "./AllProducts.module.css"
import downIcon from "../../assets/images/downIcon.svg"
import upIcon from "../../assets/images/upIcon.png"

function AllProducts(){
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const status  = useSelector(state => state.products.status);

    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [showDiscounted, setShowDiscounted] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);



    

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    useEffect(() => {
        
        setDisplayedProducts(products);
    }, [products]);

    useEffect(() => {
        if(priceFrom !== "" || priceTo !== "") {
            const filteredProducts = products.filter(product => {
                const price = product.price;
                return (priceFrom === "" || price >= priceFrom)  && (priceTo === '' || price <= priceTo);
            })
            setDisplayedProducts(filteredProducts)
        }else{
            setDisplayedProducts(products)
        }
    }, [priceFrom, priceTo, products])

    useEffect(() => {
        if (showDiscounted) {
            const discountedProducts = products.filter(product => product.discont_price !== null && product.discont_price < product.price);
            setDisplayedProducts(discountedProducts);
        } else {
            setDisplayedProducts(products);
        }
    }, [showDiscounted, products]);

    function handleSortChange(event) {
        
        const sortValue = event.target.value;
        const sortedProducts = [...products];
        

    switch(sortValue) {
        case "newest":
           
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case "highToLow":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "lowToHigh":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        default:
           
            break;
        
    }
    setDisplayedProducts(sortedProducts);
}
    
function handleDiscountCheckboxChange() {
    setShowDiscounted(!showDiscounted);
}


const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
};


    return(
        <div className={styles.allProductsDiv}>
          <MainPageBtn />
          <button className={styles.allProductsBtn}>All products</button>
          <p className={styles.allProductsTitle}>All products</p>
          <div className={styles.allInputs}>
          <div className={styles.priceInputText}>
          <p className={styles.priceText}>Price</p>
          <input type="text" placeholder="from" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}/>
          <input type="text" placeholder="to" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}/>
          </div>
          <div className={styles.discountedInput}>
          <p className={styles.discountPar}>Discounted items</p>
          <input 
                className={styles.checkbox}
                type="checkbox"
                checked={showDiscounted}
                onChange={handleDiscountCheckboxChange}
            />
            </div>
            <div className={styles.span}>
          <span>
    <label>Sorted  </label>
    <select className={styles.priceSort} onChange={handleSortChange} onClick={toggleSelect} 
    style={{ backgroundImage: `url(${isSelectOpen ? upIcon : downIcon})` }}>
        <option value="default">by default</option>
        <option value="newest">newest</option>
        <option value="highToLow">price: high-low</option>
        <option value="lowToHigh">price: low-high</option>
    </select>
</span>
</div>
</div>
          <div className={styles.productsImage}>
            {status === "loading" && <p>Loading...</p>}
            {status === "succeeded" && 
            displayedProducts.map(product => (
                
                <div key={product.id}>
                    <img className={styles.productImg} src={`http://localhost:3333${product.image}`} alt={product.title}/>
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    {product.discont_price && <p>{product.discont_price}</p>}
                </div>
                
            ))
            }
          </div>
        </div>
    )
}


export default AllProducts