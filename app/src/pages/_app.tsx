import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";

import { CodeContextProvider } from "@/contexts/CodeContext";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [polygon, mainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "bAAw",
  projectId: process.env.WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
