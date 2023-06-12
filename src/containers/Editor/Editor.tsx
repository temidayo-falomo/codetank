import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./Editor.module.css";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import Prism from "prismjs";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function Editor() {
  const [language, setLanguage] = useState<string>("xml"); // ["xml", "css", "js"
  const [htmlCode, setHtmlCode] = useState<string>(
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Tank</title>
      <link rel="stylesheet" href="style.css" />
      <link
      href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,500,600,300&display=swap"
      rel="stylesheet"></link>
    </head>
    <body>
      <h1>Hello World</h1>
      <script src="script.js"></script>
    </body>
  </html>
  `
  );
  const [cssCode, setCssCode] = useState<string>(
    `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  body {
    background-color: #fff;
    color: #000;
    font-family: "Clash Display";
    padding: 1rem;
  }

  h1 {
    font-size: 3rem;
  }
  `
  );
  const [jsCode, setJsCode] = useState<string>(
    `console.log("Hello World");
  `
  );
  const [code, setCode] = useState<string>(
    htmlCode +
      "<style>" +
      cssCode +
      "</style>" +
      "<scri" +
      "pt>" +
      jsCode +
      "</scri" +
      "pt>"
  );

  const [loading, setLoading] = useState(false);

  const [boxPosition, setBoxPosition] = useState<any>(5);
  const [pushNumber, setPushNumber] = useState(0);

  const inputRef = useRef<any>(null);
  const caretPositionRef = useRef<number>(0); // Ref to store the caret position
  const divRef = useRef<HTMLDivElement>(null); // Ref for the div element

  const handleKeyUp = () => {
    const caretPosition = inputRef.current?.selectionStart || 0;
    caretPositionRef.current = caretPosition; // Update the caret position ref
    setBoxPosition(caretPosition);
  };

  useEffect(() => {
    setCode(
      htmlCode +
        "<style>" +
        cssCode +
        "</style>" +
        "<scri" +
        "pt>" +
        jsCode +
        "</scri" +
        "pt>"
    );
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Code Tank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.editor}>
        <Sidebar language={language} setLanguage={setLanguage} />

        <div className={styles.codeblock}>
          <div className={styles.nav}>
            <div
              onClick={() => {
                setLanguage("xml");
              }}
              className={`${styles.navItem} ${
                language === "xml" ? styles.active : ""
              }`}
            >
              <AiFillHtml5 />
              <span className={styles.navItemText}>index.html</span>
              {/* {<CgClose />} */}
            </div>

            <div
              onClick={() => {
                setLanguage("css");
              }}
              className={`${styles.navItem} ${
                language === "css" ? styles.active : ""
              }`}
            >
              <FaCss3Alt />
              <span className={styles.navItemText}>style.css</span>
            </div>

            <div
              onClick={() => {
                setLanguage("javascript");
              }}
              className={`${styles.navItem} ${
                language === "javascript" ? styles.active : ""
              }`}
            >
              <SiJavascript />
              <span className={styles.navItemText}>script.js</span>
            </div>
          </div>

          <div className="code-edit-container">
            <textarea
              onKeyDown={handleKeyUp}
              ref={inputRef}
              className="code-input"
              value={
                language === "xml"
                  ? htmlCode
                  : language === "css"
                  ? cssCode
                  : jsCode
              }
              onChange={(e) => {
                if (language === "xml") {
                  setHtmlCode(e.target.value);
                } else if (language === "css") {
                  setCssCode(e.target.value);
                } else if (language === "javascript") {
                  setJsCode(e.target.value);
                }
                setLoading(true);

                setTimeout(() => {
                  setLoading(false);
                }, 1500);
              }}
            ></textarea>
            <pre className="code-output">
              <code
                className={`language-${language}`}
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {language === "xml"
                  ? htmlCode
                  : language === "css"
                  ? cssCode
                  : jsCode}
              </code>
            </pre>

            <div
              ref={divRef}
              className="caret-div"
              style={{
                top: boxPosition - pushNumber,
              }}
            >
              <MdKeyboardArrowUp
                className="close"
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => setPushNumber(pushNumber + 50)}
              />

              <div className="select">
                <span>div</span>
              </div>

              <div className="select">
                <span>br</span>
              </div>

              <div className="select">
                <span>span</span>
              </div>

              <div className="select">
                <span>code</span>
              </div>
            </div>
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
