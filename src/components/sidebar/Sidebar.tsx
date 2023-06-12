import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.aside}>
      <div className={styles.top}>
        <h2>Explorer</h2>
      </div>

      <div>
        <div className={styles.filename}>
          <span>My New Project</span>
        </div>
      </div>

      <div className={styles.col}>
        <span>Index.html</span>
        <span>style.css</span>
        <span>script.js</span>
      </div>
    </div>
  );
}
