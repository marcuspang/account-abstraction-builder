import update from "immutability-helper";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";

import { DropBoxCard, ItemTypes } from "./DropBoxCard";

const style = {
	width: 400,
};

export interface ContainerState {
	cards: any[];
}

const plugins = [
	{
		id: 1,
		text: "Write a cool JS library",
	},
	{
		id: 2,
		text: "Make it generic enough",
	},
	{
		id: 3,
		text: "Write README",
	},
	{
		id: 4,
		text: "Create some examples",
	},
	{
		id: 5,
		text: "Spam in Twitter and IRC to promote it",
	},
	{
		id: 6,
		text: "???",
	},
	{
		id: 7,
		text: "PROFIT",
	},
];

const DropBoxArea: FC = memo(function Container() {
	const [cards, setCards] = useState(plugins);

	const findCard = useCallback(
		(id: string) => {
			const card = cards.filter((c) => `${c.id}` === id)[0] as {
				id: number;
				text: string;
			};
			return {
				card,
				index: cards.indexOf(card),
			};
		},
		[cards]
	);

	const moveCard = useCallback(
		(id: string, atIndex: number) => {
			const { card, index } = findCard(id);
			setCards(
				update(cards, {
					$splice: [
						[index, 1],
						[atIndex, 0, card],
					],
				})
			);
		},
		[findCard, cards, setCards]
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
		<div ref={drop} className="w-full bg-black space-y-2">
			{cards.map((card) => (
				<DropBoxCard
					key={card.id}
					id={`${card.id}`}
					text={card.text}
					moveCard={moveCard}
					findCard={findCard}
				/>
			))}
		</div>
	);
});

export default DropBoxArea;
