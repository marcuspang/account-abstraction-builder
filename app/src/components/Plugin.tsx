import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Plugin({
	image,
	title,
	description,
}: {
	image: string;
	title: string;
	description: string;
}) {
	const [clickBlocked, setClickBlocked] = useState(false);

	const handleToastClick = () => {
		setClickBlocked(true);
		toast("Modifier added successfully!");
		setTimeout(() => {
			setClickBlocked(false);
		}, 5000);
	};

	const handleAddClick = () => {
		if (!clickBlocked) {
			handleToastClick();
		}
	};

	return (
		<div className="flex items-center border-b border-gray-200 py-4">
			<Image
				src={image}
				alt=""
				width={16}
				height={16}
				className="w-16 h-16 rounded-lg mr-4"
			/>
			<div className="flex-1">
				<h3 className="font-medium">{title}</h3>
				<p className={`mt-1 flex`}>{description}</p>
			</div>
			<button
				className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2"
				onClick={handleAddClick}>
				Add plugin
			</button>
		</div>
	);
}

export default Plugin;
