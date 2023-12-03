import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../store/slices/productSlice"
import styles from "./SaleComponent.module.css"



function SaleComponent(){

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const [saleProducts, setSaleProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    
    function selectRandomProducts (products)  {
        let shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    };
    const updateSelectedProducts = () => {
        if (saleProducts.length > 0) {
            const newSelectedProducts = selectRandomProducts(saleProducts);
            setSelectedProducts(newSelectedProducts);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const discountedProducts = products.filter(product => product.discont_price && product.discont_price < product.price);
        setSaleProducts(discountedProducts);
    }, [products]);

    useEffect(() => {
        if (saleProducts.length > 0) {
            setSelectedProducts(selectRandomProducts(saleProducts));
        }
    }, [saleProducts]);


    const calculateDiscountPercent = (originalPrice, discountPrice) => {
        return ((originalPrice - discountPrice) / originalPrice * 100).toFixed(0);
      };

    return (
        <div className={styles.saleComponent}>
            <div className={styles.titleBtnDiv}>
            <p className={styles.componentTitle}>Sale</p>
            <div className={styles.componentBar}></div>
            <button className={styles.componentBtn}>All sales</button>
            </div>
            <div>
                <button className={styles.updateBtn} onClick={updateSelectedProducts}>update</button>
            
            {status === 'loading' && <p className={styles.loading}>Loading...</p>}
            {status === 'succeeded' && selectedProducts.map(product => (
                <div key={product.id} className={styles.product}>
                    <img src={`http://localhost:3333${product.image}`} alt={product.title} />
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                    <div className={styles.percentDiv}>
                        <p>-{calculateDiscountPercent(product.price, product.discont_price)}%</p>
                    </div>
                    <p>{product.title}</p>
                    <div className={styles.price}>
                        <p>{product.discont_price}</p>
                        <p className={styles.originalPrice}>{product.price}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SaleComponent