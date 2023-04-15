import DeployButton from "@/components/DeployButton";
import DropBoxArea from "@/components/Draggables/DropBoxArea";
import PluginCard from "@/components/PluginCard";
import clientService from "@/proto/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { id } from "ethers/lib/utils.js";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const inter = Inter({ subsets: ["latin"] });

// TODO: figure out how other code editors do this
// TODO: adding modifiers !== composing code logic, not sure if this is what we are trying to aim for
const PLUGINS_DATA = [
  {
    displayName: "Add guard modifier",
    protocol: "Gnosis",
    id: 1,
    description:
      "Adds a guard modifier to all public methods, excluding the constructor",
    modifyCode: (code: string) => {
      return code
        .split("\n")
        .map((line) => {
          if (!line.includes("constructor") && line.includes("public")) {
            line += "\n";
            for (const char of line) {
              if (char === " ") {
                line += " ";
              } else {
                break;
              }
            }
            line += "    ";
            line += "_mustBeOwner();";
          }
          return line;
        })
        .join("\n");
    },
  },
];

export interface Plugin {
  displayName: string;
  protocol: string;
  id: number;
  description: string;
  modifyCode: (code: string) => string;
}

const HomePage = () => {
  const [plugins, setPlugins] = useState(PLUGINS_DATA);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-7xl w-full mx-auto">
      <h1 className={`text-5xl font-bold text-center ${inter.className} pb-4`}>
        Your wallet made with Account Abstraction.
      </h1>
      <div className="absolute right-[58%] top-[70%] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] -z-50"></div>
      <ConnectButton />
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-5 pt-12 z-0 gap-4 w-full">
          <div className="col-span-2">
            <ul className="pb-12">
              {PLUGINS_DATA.map((plugin, index) => (
                <PluginCard
                  key={index}
                  {...plugin}
                  onClick={(id: number) =>
                    setPlugins((prev) => {
                      const currentPlugin = plugins.find(
                        (plugin) => plugin.id === id
                      );

                      if (currentPlugin === undefined) {
                        return [
                          ...prev,
                          PLUGINS_DATA.find((plugin) => plugin.id === id)!,
                        ];
                      }
                      const result = prev.filter((plugin) => plugin.id !== id);
                      return result;
                    })
                  }
                  currentPlugins={plugins}
                />
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <DropBoxArea plugins={plugins} setPlugins={setPlugins} />
          </div>
        </div>
      </DndProvider>
      <DeployButton>Deploy</DeployButton>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(clientService.GetSolidityCodeRequest);
  return {
    props: {},
  };
};

export default HomePage;
