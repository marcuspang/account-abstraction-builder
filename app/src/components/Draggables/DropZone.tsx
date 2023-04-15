// components/DropZone.tsx

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem, { DraggableItemProps } from "./DraggableItem";

interface DropZoneProps {
	accept: string;
}

const DropZone: React.FC<DropZoneProps> = ({ accept }) => {
	const [items, setItems] = useState<DraggableItemProps[]>([]);

	const [{ isOver }, drop] = useDrop(() => ({
		accept,
		drop: (item: DraggableItemProps) => {
			setItems((prevItems) => [...prevItems, item]);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={drop}
			className={`flex flex-col justify-start items-center h-full w-full border-2 border-dashed ${
				isOver ? "border-green-500" : "border-gray-500"
			}`}>
			{items.map((item) => (
				<DraggableItem
					key={item.id}
					id={item.id}
					protocol={item.protocol}
					displayName={item.displayName}
				/>
			))}
		</div>
	);
};

export default DropZone;
