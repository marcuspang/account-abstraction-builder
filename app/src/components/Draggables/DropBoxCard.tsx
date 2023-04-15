import { Dialog, Transition } from "@headlessui/react";
import Prism, { highlight, languages } from "prismjs";
import type { CSSProperties } from "react";
import { Fragment, memo, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Editor from "react-simple-code-editor";
import { CodePlugin } from "../Plugins/PluginsSection";

// `Prism` has to be imported first
import "prismjs/components/prism-css";
import "prismjs/components/prism-solidity";

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
  plugin: CodePlugin;
  moveCard: (id: string, to: number) => void;
  findCard?: (id: string) => { index: number };
}

interface Item {
  id: string;
  originalIndex: number;
}

export const DropBoxCard = memo(function Card({
  id,
  plugin,
  moveCard,
  findCard,
}: CardProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

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

  const { displayName, description } = plugin;
  const code = `// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;`;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const url = 'http://localhost:1510/api';
    const data = {
      plugins: [
        {
          id: 1,
          params: {
            '<PARAM1>': '0x0',
          },
        },
      ],
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        className={`border-2 py-2 px-4 rounded border-slate-400 hover:bg-slate-900 active:opacity-80 transition-colors hover:cursor-pointer text-slate-300 hover:text-slate-200 w-full ${isDragging ? "opacity-50" : ""
          }`}>
        <div className="flex justify-between space-x-2 items-center">
          <div className="flex flex-col">
            <div className="text-lg font-bold">
              {originalIndex + 1}. {displayName}
            </div>
            <div className="text-sm font-light text-slate-200">
              {description}
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-thin whitespace-nowrap p-2 border border-slate-200 items-center h-8 flex rounded-xl hover:bg-slate-200 hover:text-slate-900"
            onClick={() => {
              openModal();
            }}>
            show code
          </button>
        </div>
      </div>

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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-slate-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between">
                    <div className="div">{displayName}</div>
                    <div className="div">Validators: 4</div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <Editor
                        value={code}
                        onValueChange={(code) => {
                          code;
                        }}
                        padding={10}
                        highlight={(code) =>
                          highlight(code, languages.sol, "solidity")
                        }
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 12,
                        }}
                      />
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      View on Git
                    </button>
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
});
