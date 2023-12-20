import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import styles from "./Categories.module.css";
import { useNavigate } from "react-router-dom";
import MainPageBtn from "../../components/mainPageBtn/MainPageBtn";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

function Categories() {
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);


  useEffect(() => {
    setDocumentTitle("category")
    
      dispatch(fetchCategories());
    
  }, [ dispatch]);

 

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <div className={styles.categoriesDiv}>
        <MainPageBtn />
        <button
          className={styles.categoriesBtn}
          onClick={() => {
            navigate("/categories");
          }}
        >
          Categories
        </button>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <div className={styles.categoriesDivImg}>
          {status === "loading" && <p className={styles.loading}>Loading...</p>}
          {status === "succeeded" &&
            categories.map((category) => (
              <div className={styles.imgPDiv} key={category.id}>
                <img
                  className={styles.categoriesImg}
                  src={`http://localhost:3333${category.image}`}
                  alt={category.title}
                  onClick={() => {
                    handleCategoryClick(category.id);
                  }}
                />
                <p className={styles.categoriInfo}>{category.title}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
