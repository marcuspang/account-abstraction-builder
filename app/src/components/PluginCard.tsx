import { CodePlugin } from "./PluginsSection";

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
			className="w-full space-y-2 border-2 p-2 border-slate-300 rounded-lg hover:opacity-70 hover:cursor-pointer flex justify-between items-center"
			onClick={() => onClick(id)}>
			<div className="flex flex-col">
				<div className="text-lg font-bold">{displayName}</div>
				<div className="text-sm font-light text-slate-200">{description}</div>
			</div>
			<div className="ml-1">
				{isAlreadyInPlugins ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-5 h-5 stroke-green-400">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				) : (
					<div className="text-sm font-thin">add</div>
				)}
			</div>
		</div>
	);
};

export default PluginCard;
