import FancyButton from "@/components/DeployButton";
import DropBoxArea from "@/components/Draggables/DropBoxArea";
import PluginsSection, {
  PLUGINS_DATA,
} from "@/components/Plugins/PluginsSection";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ContractFactory } from "ethers";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [factory, setFactory] = useState<ContractFactory>();

  useEffect(() => {
    const url = `${process.env.BACKEND_URL}/api`;
    const data = {
      plugins: [
        {
          id: 1,
          params: {
            "<PARAM1>": "0xAD2d2CDE7CA8d116d545099405C1FDFc57B6FD9e",
          },
        },
      ],
    };

    async function deploy() {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (data) => {
          const artifact = JSON.parse(data.artifact);
          const factory = new ContractFactory(artifact.abi, artifact.bytecode);
          // const contract = await factory.deploy(deployArgs);
          // const contract = await factory.deploy();
          setFactory(factory);
        })
        .catch((error) => console.error(error));
    }

    deploy();
  }, []);

  const handleDeploy = async () => {
    try {
      if (factory) {
        // Perform deployment logic here, such as calling a contract function or interacting with a smart contract
        const result = await factory.deploy(
          "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          "0xAD2d2CDE7CA8d116d545099405C1FDFc57B6FD9e"
        );
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <PluginsSection plugins={plugins} setPlugins={setPlugins} />
          </div>
          <div className="col-span-3">
            <DropBoxArea plugins={plugins} setPlugins={setPlugins} />
          </div>
        </div>
      </DndProvider>
      <FancyButton onClick={handleDeploy}>Deploy</FancyButton>
    </main>
  );
};

export default HomePage;
