import update from "immutability-helper";
import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import { DropBoxCard, ItemTypes } from "./DropBoxCard";
import { CodePlugin } from "../PluginsSection";

export interface ContainerState {
	cards: any[];
}

const DropBoxArea = memo(function Container({
	plugins,
	setPlugins,
}: {
	plugins: CodePlugin[];
	setPlugins: Dispatch<SetStateAction<CodePlugin[]>>;
}) {
	const findCard = useCallback(
		(id: string) => {
			const card = plugins.filter((c) => `${c.id}` === id)[0];
			return {
				card,
				index: plugins.indexOf(card),
			};
		},
		[plugins]
	);

	const moveCard = useCallback(
		(id: string, atIndex: number) => {
			const { card, index } = findCard(id);
			setPlugins(
				update(plugins, {
					$splice: [
						[index, 1],
						[atIndex, 0, card],
					],
				})
			);
		},
		[findCard, plugins, setPlugins]
	);

	const [, drop] = useDrop(() => ({
		accept: ItemTypes.CARD,
		drop: () => ({ name: "Dustbin" }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	return (
		<div ref={drop} className="w-full space-y-2">
			{plugins.map((card) => (
				<DropBoxCard
					key={card.id}
					id={`${card.id}`}
					plugin={card}
					moveCard={moveCard}
					findCard={findCard}
				/>
			))}
		</div>
	);
});

export default DropBoxArea;
