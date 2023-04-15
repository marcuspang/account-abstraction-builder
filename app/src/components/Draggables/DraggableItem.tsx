// components/DraggableItem.tsx

import React from "react";
import { useDrag } from "react-dnd";

export interface DraggableItemProps {
	id: string;
	protocol: string;
	displayName: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
	id,
	protocol,
	displayName,
}) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "ITEM",
		item: { id, protocol, displayName },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={`border-2 py-2 px-4 rounded border-slate-400 hover:bg-slate-900 active:opacity-80 transition-colors hover:cursor-pointer text-slate-300 hover:text-slate-200 ${
				isDragging ? "opacity-50" : ""
			}`}>
			<span className="font-bold">{protocol}</span> - {displayName}
		</div>
	);
};

export default DraggableItem;
