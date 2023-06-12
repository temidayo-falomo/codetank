import { useState } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function Sidebar({ language, setLanguage }: SidebarProps) {
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
        <span
          onClick={() => {
            setLanguage("xml");
          }}
          className={language === "xml" ? styles.active : ""}
        >
          Index.html
        </span>
        <span
          onClick={() => {
            setLanguage("css");
          }}
          className={language === "css" ? styles.active : ""}
        >
          style.css
        </span>
        <span
          onClick={() => {
            setLanguage("javascript");
          }}
          className={language === "javascript" ? styles.active : ""}
        >
          script.js
        </span>
      </div>
    </div>
  );
}
