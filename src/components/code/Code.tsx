import React, { useEffect } from "react";
// import Prism from "prismjs";

interface CodeProps {
  code: string;
  language: string;
}

export default function Code({ code, language }: CodeProps) {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
