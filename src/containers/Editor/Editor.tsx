import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./Editor.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

export default function Editor() {
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html>

  <head>
  <title>My First Website</title>
  <link
  href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,500,600,300&display=swap"
  rel="stylesheet"
></link>
  
  </head>

  <body>
  <h1>Hello World</h1>
  <p>Lorem ipsum dolor sit amet,
  consectetur adipiscing elit,
   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </body>
  </html>


  <script>
    // alert("Hello World");
  </script>

  <style>
    body {

      color: #000;
      font-family: "Clash Display", sans-serif;
    }
    </style>
  `);

  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");

  const handleKeyDown = (e: any) => {
    // let value = "xml",
    //   selStartPos = e.currentTarget.selectionStart;
    // // handle 4-space indent on
    // if (e.key === "Tab") {
    //   value =
    //     value.substring(0, selStartPos) +
    //     "    " +
    //     value.substring(selStartPos, value.length);
    //   e.currentTarget.selectionStart = selStartPos + 3;
    //   e.currentTarget.selectionEnd = selStartPos + 4;
    //   e.preventDefault();
    //   setCode(value);
    // }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Code Tank" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,500,600,300&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atelier-cave-dark.min.css"
        ></link>
      </Head>

      <div className={styles.editor}>
        <Sidebar />

        <div className={styles.codeblock}>
          <div className={styles.nav}>
            <div className={styles.navItem}>
              <AiFillHtml5 />
              <span className={styles.navItemText}>index.html</span>
              <span></span>
            </div>
            <div className={styles.navItem}>
              <FaCss3Alt />
              <span className={styles.navItemText}>style.css</span>
            </div>
            <div className={styles.navItem}>
              <SiJavascript />
              <span className={styles.navItemText}>script.js</span>
            </div>
          </div>

          <div className="code-edit-container">
            <textarea
              className="code-input"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setLoading(true);

                setTimeout(() => {
                  setLoading(false);
                }, 1500);
              }}
              onKeyDown={handleKeyDown}
            ></textarea>
            <pre className="code-output">
              <code
                className={`language-xml`}
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <>
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            <iframe
              onError={(e) => console.error("Iframe loading error:", e)}
              id="viewer"
              className={styles.iframe}
              srcDoc={code}
              title="output"
              sandbox="allow-scripts"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </>
  );
}
