import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { CodeContextProvider } from "@/contexts/CodeContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <CodeContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        progressClassName={"!bg-slate-300"}
        toastClassName={"!bg-gray-800/60"}
      />
      <Component {...pageProps} />
    </CodeContextProvider>
  );
}
