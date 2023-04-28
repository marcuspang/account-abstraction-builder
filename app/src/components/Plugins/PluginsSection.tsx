import groupBy from "lodash/groupBy";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import PluginCard from "./PluginCard";

interface PluginsSectionProps {
  plugins: CodePlugin[];
  setPlugins: Dispatch<SetStateAction<CodePlugin[]>>;
}

export const PLUGINS_DATA: CodePlugin[] = [
  {
    displayName: "Send notification",
    protocol: "Push",
    src: "https://storage.googleapis.com/ethglobal-api-production/organizations%2F10a1v%2Flogo%2F1664802172170_aiOxYOJI_400x400.jpeg",
    id: 1,
    description:
      "Sends a push notification to the specified address whenever a transaction occurs",
  },
  {
    displayName: "AAVE auto-lend",
    protocol: "AAVE",
    src: "https://storage.googleapis.com/ethglobal-api-production/organizations%2Foiv32%2Flogo%2F1675803642879_EdjUdYhC_400x400.jpeg",
    id: 2,
    description:
      "Immediately lends to the specified pool whenever a currency is deposited to the wallet",
  },
  {
    displayName: "Social Recovery",
    protocol: "Safe",
    src: "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fweaax%2Flogo%2F1667857487267_vRyTLmek_400x400.jpeg",
    id: 3,
    description:
      "Enables you to recover your wallet through social media accounts",
  },
  {
    displayName: "Make wallet soulbound to Worldcoin",
    protocol: "Worldcoin",
    src: "https://storage.googleapis.com/ethglobal-api-production/organizations%2F3zpxc%2Flogo%2F1664911741220_worldcoin.jpeg",
    id: 4,
    description:
      "Ensures that the wallet is only accessible to the specified Worldcoin account",
    params: [
      {
        name: "test",
        value: "test",
      },
      {
        name: "test",
        value: "test",
      },
    ],
  },
];

const logoPluginMap = {
  Push: "https://storage.googleapis.com/ethglobal-api-production/organizations%2F10a1v%2Flogo%2F1664802172170_aiOxYOJI_400x400.jpeg",
  AAVE: "https://storage.googleapis.com/ethglobal-api-production/organizations%2Foiv32%2Flogo%2F1675803642879_EdjUdYhC_400x400.jpeg",
  Safe: "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fweaax%2Flogo%2F1667857487267_vRyTLmek_400x400.jpeg",
  Worldcoin:
    "https://storage.googleapis.com/ethglobal-api-production/organizations%2F3zpxc%2Flogo%2F1664911741220_worldcoin.jpeg",
};

export interface CodePlugin {
  displayName: string;
  protocol: string;
  id: number;
  src: string;
  description: string;
  params?: { name: string; value: string }[];
}

const PluginsSection = ({ plugins, setPlugins }: PluginsSectionProps) => {
  const pluginsByProtocol = groupBy(PLUGINS_DATA, "protocol");

  return (
    <div className="pb-12 space-y-4">
      {Object.entries(pluginsByProtocol).map(([protocol, protocolPlugins]) => (
        <div key={protocol}>
          <h2 className="text-2xl font-medium mb-3 flex gap-2">
            <Image
              alt={protocol}
              src={logoPluginMap[protocol as keyof typeof logoPluginMap]}
              width={32}
              height={32}
              className=" rounded-full"
            />
            {protocol}
          </h2>
          <ul className="space-y-2">
            {protocolPlugins.map((plugin) => (
              <PluginCard
                key={plugin.id}
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
      ))}
    </div>
  );
};

export default PluginsSection;
