import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";

export const ItemTypes = {
	CARD: "card",
};

const style: CSSProperties = {
	border: "1px dashed gray",
	padding: "0.5rem 1rem",
	marginBottom: ".5rem",
	backgroundColor: "white",
	cursor: "move",
};

export interface CardProps {
	id: string;
	text: string;
	moveCard: (id: string, to: number) => void;
	findCard?: (id: string) => { index: number };
}

interface Item {
	id: string;
	originalIndex: number;
}

export const DropBoxCard: FC<CardProps> = memo(function Card({
	id,
	text,
	moveCard,
	findCard,
}) {
	const originalIndex = findCard ? findCard(id).index : 0;
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.CARD,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveCard(droppedId, originalIndex);
				}
			},
		}),
		[id, originalIndex, moveCard]
	);

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			hover({ id: draggedId }: Item) {
				if (draggedId !== id) {
					const { index: overIndex } = findCard ? findCard(id) : { index: 0 };
					moveCard(draggedId, overIndex);
				}
			},
		}),
		[findCard, moveCard]
	);

	return (
		<div
			ref={(node) => drag(drop(node))}
			className={`border-2 py-2 px-4 rounded border-slate-400 hover:bg-slate-900 active:opacity-80 transition-colors hover:cursor-pointer text-slate-300 hover:text-slate-200 w-full ${
				isDragging ? "opacity-50" : ""
			}`}>
			{text}
		</div>
	);
});
