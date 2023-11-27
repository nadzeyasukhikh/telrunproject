import { useDispatch, useSelector } from "react-redux"
import MainPageBtn from "../../components/MainPageBtn"
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productSlice";
import styles from "./AllProducts.module.css"

function AllProducts(){
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const status  = useSelector(state => state.products.status);
    

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    return(
        <div>
          <MainPageBtn />
          <button>All products</button>
          <p>All products</p>
          <div>
            {status === "loading" && <p>Loading...</p>}
            {status === "succeeded" && 
            products.map(product => (
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