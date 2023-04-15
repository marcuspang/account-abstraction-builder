import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Market from "./Market";

const AddModifierButton = () => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<Tippy
				content="Add plugins to your wallet!"
				animation="shift"
				arrow={true}
				interactive={true}>
				<button
					className="border-2 border-slate-300 rounded-full w-24 h-24 flex mx-auto items-center justify-center text-slate-300 transition-all group relative hover:border-slate-900 hover:text-slate-900"
					role="button"
					onClick={openModal}>
					<span className="text-6xl h-[6rem] normal-line-height w-full">+</span>
				</button>
			</Tippy>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										Marketplace
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Here you can add plugins to your wallet.
										</p>
									</div>

									<Market />

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}>
											Close
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default AddModifierButton;
