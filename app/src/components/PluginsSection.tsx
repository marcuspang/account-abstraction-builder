import { plugins } from "prismjs";
import PluginCard from "./PluginCard";
import { Dispatch, SetStateAction } from "react";

interface PluginsSectionProps {
  plugins: CodePlugin[];
  setPlugins: Dispatch<SetStateAction<CodePlugin[]>>;
}

export const PLUGINS_DATA = [
  {
    displayName: "Send notification",
    protocol: "Push",
    id: 1,
    description:
      "Sends a push notification to the specified address whenever a transaction occurs",
  },
  {
    displayName: "AAVE auto-lend",
    protocol: "AAVE",
    id: 2,
    description:
      "Immediately lends to the specified pool whenever a currency is deposited to the wallet",
  },
  {
    displayName: "Social Recovery",
    protocol: "Safe",
    id: 3,
    description:
      "Enables you to recover your wallet through social media accounts",
  },
  {
    displayName: "Make wallet soulbound to Worldcoin",
    protocol: "Worldcoin",
    id: 4,
    description:
      "Ensures that the wallet is only accessible to the specified Worldcoin account",
  },
];

export interface CodePlugin {
  displayName: string;
  protocol: string;
  id: number;
  description: string;
}

const PluginsSection = ({ plugins, setPlugins }: PluginsSectionProps) => {
  return (
    <ul className="pb-12 space-y-2">
      {PLUGINS_DATA.map((plugin, index) => (
        <PluginCard
          key={index}
          {...plugin}
          onClick={(id: number) =>
            setPlugins((prev) => {
              const currentPlugin = plugins.find((plugin) => plugin.id === id);

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
  );
};

export default PluginsSection;
