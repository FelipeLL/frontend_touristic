import profile from "../images/profile_1.jpg";
import styles from "../styles/viewProfile.module.css";
const ViewProfile = () => {
  return (
    <div
      className={`${styles.profile} ${styles["profile-card"]}  ${styles.shadow}   `}
    >
      <div className={styles["profile-title"]}>PERFIL</div>
      <div className={`${styles["profile-circular"]}`}>
        <img src={profile} alt="profile" />
      </div>
      <p className={styles["profile-text"]}>Felipe Ladino</p>
      <div className={styles["profile-contact"]}>
        <p>(+57) 3009764512</p>
        <p>perfil@gmail.com</p>
      </div>
    </div>
  );
};

export default ViewProfile;
