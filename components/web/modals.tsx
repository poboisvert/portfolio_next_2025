"use client";

import React, { useState, useRef, useEffect } from "react";

const Modals = ({ item }: any) => {
  const [openModal, setModal] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);

  // Function to toggle the modal state
  const handleModal = () => {
    setModal(!openModal);
  };

  // Effect to handle click outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target !== modalRef.current &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div key={item.title}>
      <button
        type='button'
        className='text-neon-blue dark:text-green rounded p-2 border border-neon-blue dark:border-green rounded-md'
        onClick={handleModal}
      >
        {item.title}
      </button>
      {openModal && (
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
          <div
            ref={modalRef as React.RefObject<HTMLDivElement>}
            className='max-w-[460px] bg-white shadow-lg py-2 rounded-md mx-8'
          >
            <h2 className='text-gray-900 border-b border-gray-300 px-4 my-4'>
              {item.title}
            </h2>
            <div className='px-4 pb-4'>
              <p className='text-sm font-medium text-gray-900'>
                {item.description}
              </p>
            </div>
            <div className='border-t border-gray-300 flex justify-between items-center px-4 pt-2'>
              <button
                type='button'
                className='h-8 px-4 text-sm rounded-md bg-neon-blue dark:bg-green text-gray-50'
                onClick={handleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modals;
