import "prismjs/themes/prism-dark.css";

import { useCodeContext } from "@/contexts/CodeContext";
import Prism, { highlight, languages } from "prismjs";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";

// `Prism` has to be imported first
import "prismjs/components/prism-css";
import "prismjs/components/prism-solidity";
import { ServiceClientImpl } from "@/proto_client/proto/service";
import { HttpRpc } from "@/proto_client/proto/rpc";

// TODO: add numbering
const CodeEditor = () => {
  const { code, setCode } = useCodeContext();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode?.(code)}
      padding={10}
      highlight={(code) => highlight(code, languages.sol, "solidity")}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
};

export default CodeEditor;
