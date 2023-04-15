import Plugin from "../components/Plugin";

const plugins = [
	{
		image: "https://via.placeholder.com/128",
		title: "Plugin 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum orci eget nulla pharetra, a dapibus nibh tincidunt. Proin hendrerit nulla ut nisl iaculis finibus.",
	},
	{
		image: "https://via.placeholder.com/128",
		title: "Plugin 2",
		description:
			"Suspendisse potenti. In egestas libero et sem laoreet euismod. Etiam vulputate lectus et est ullamcorper sagittis. Sed ultrices rhoncus dui sit amet dignissim.",
	},
	{
		image: "https://via.placeholder.com/128",
		title: "Plugin 3",
		description:
			"Maecenas sodales fermentum nulla, quis consequat turpis dapibus eget. Nullam id metus tellus. Vivamus ultrices ante in vestibulum finibus. Nam porta lacus ac neque auctor, vitae faucibus elit molestie.",
	},
];

export default function Market() {
	return (
		<div className="w-full px-2 py-2">
			{plugins.map((plugin) => (
				<Plugin
					key={plugin.title}
					image={plugin.image}
					title={plugin.title}
					description={plugin.description}
				/>
			))}
		</div>
	);
}
