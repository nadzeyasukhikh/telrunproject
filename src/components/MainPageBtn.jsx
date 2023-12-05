import { useNavigate } from "react-router-dom";
import styles from "../components/MainPageBtn.module.css";
function MainPageBtn() {
  const navigateCategories = useNavigate();

  return (
    <>
      <button
        className={styles.mainPageBtn}
        onClick={() => {
          navigateCategories("/");
        }}
      >
        Main page
      </button>
    </>
  );
}

export default MainPageBtn;
