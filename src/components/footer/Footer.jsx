import styles from "./Footer.module.css";
import inst from "../../assets/images/ic-instagram.svg";
import whatsapp from "../../assets/images/ic-whatsapp.svg";
function Footer() {
  return (
    <div>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.divInfo}>
        <div>
          <div className={styles.infoText}>
            <p className={styles.paragraphText}>Phone</p>
            <p className={styles.paragraphInfo}>+49 999 999 99 99</p>
          </div>
          <div className={styles.infoText}>
            <p className={styles.paragraphText}>Address</p>
            <p className={styles.paragraphInfo}>
              Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
            </p>
          </div>
        </div>
        <div>
          <div className={`${styles.infoText} ${styles.infotextTwo}`}>
            <p className={styles.paragraphText}>Socials</p>
            <div className={styles.footerImg}>
              <img src={inst} alt="instagram" />
              <img src={whatsapp} alt="whatsapp" />
            </div>
          </div>
          <div className={`${styles.infoText} ${styles.infotextTwo}`}>
            <p className={styles.paragraphText}>Working Hours</p>
            <p className={styles.paragraphInfoInfo}>24 hours a day</p>
          </div>
          <div></div>
        </div>

        <div></div>
      </div>
      <div className={styles.footerMapStyle}>
      <iframe className={styles.footerMap}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510.50899197891505!2d13.375319817128796!3d52.508032797832186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sgr!4v1700724981306!5m2!1sru!2sgr"
        title="tel-run"
      ></iframe>
      </div>
    </div>
  );
}
export default Footer;
