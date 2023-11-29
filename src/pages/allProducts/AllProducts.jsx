import { useDispatch, useSelector } from "react-redux"
import MainPageBtn from "../../components/MainPageBtn"
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/slices/productSlice";
import styles from "./AllProducts.module.css"

function AllProducts(){
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const status  = useSelector(state => state.products.status);

    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [showDiscounted, setShowDiscounted] = useState(false);

    

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

    return(
        <div>
          <MainPageBtn />
          <button>All products</button>
          <p>All products</p>
          <p>Price</p>
          <input type="text" placeholder="from" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}/>
          <input type="text" placeholder="to" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}/>
          <p>Discounted items</p>
          <input
                type="checkbox"
                checked={showDiscounted}
                onChange={handleDiscountCheckboxChange}
            />
          <span>
    <label htmlFor="priceSort">Sorted  </label>
    <select id="priceSort" onChange={handleSortChange}>
        <option value="default">by default</option>
        <option value="newest">newest</option>
        <option value="highToLow">price: high-low</option>
        <option value="lowToHigh">price: low-high</option>
    </select>
</span>
          <div>
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