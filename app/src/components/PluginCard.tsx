import type { CodePlugin } from "@/pages";

interface PluginCardProps extends CodePlugin {
  onClick: (id: number) => void;
  currentPlugins: CodePlugin[];
}

const PluginCard = ({
  id,
  displayName,
  description,
  protocol,
  onClick,
  currentPlugins: plugins,
}: PluginCardProps) => {
  const isAlreadyInPlugins =
    plugins.findIndex((plugin) => plugin.id === id) !== -1;
  return (
    <div
      className="w-full space-y-2 border-2 p-2 border-slate-300 rounded hover:opacity-70 hover:cursor-pointer flex justify-between"
      onClick={() => onClick(id)}
    >
      {displayName}{" "}
      {isAlreadyInPlugins && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      )}
    </div>
  );
};

export default PluginCard;
