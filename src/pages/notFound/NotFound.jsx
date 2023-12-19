import { useNavigate } from "react-router-dom"
import notFound from "../../assets/images/404.svg"
import styles from "./NotFound.module.css"

function NotFound(){
    const navigateNotFound = useNavigate()

    return(
        <div className={styles.notFoundDiv}>
           <img src={notFound} alt="not found" />
           <h3>Page Not Found</h3>
           <p>We’re sorry, the page you requested could not be found.
Please go back to the homepage.</p>
<button onClick={() => navigateNotFound("/")}>Go Home</button>
        </div>
    )
}

export default NotFound