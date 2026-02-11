"use client";

import { TrashIcon } from "@/assets/icons/TrashIcon";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from "@tanstack/react-query";

export const DeleteConfirmationModal = ({
  // id,
  onClose,
  mutate,
  refetch,
  label,
}: {
  // id?: number;
  onClose?: () => void;
  mutate?: UseMutateFunction<void, any, void, unknown>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  label: string;
}) => {
  return (
    <div className="w-80 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center font-Poppins">
      {/* Trash Icon */}
      <TrashIcon className="w-10 h-10 stroke-primary-500 mb-2" />

      {/* Confirmation Text */}
      <p className="text-gray-600 text-xsm mb-6 font-light">{label}</p>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        <button
          className="flex-1 py-2 text-neutral-50 bg-gray-400 rounded-lg hover:bg-gray-200 w-full  text-sm"
          // onClick={onCancel}
          onClick={() => onClose?.()}
        >
          Discard
        </button>
        <button
          className="flex-1 py-2 text-white bg-primary-500 rounded-lg  w-full text-sm hover:border-primary-500 border border-transparent hover:bg-primary-100 hover:text-primary-500 transition-colors duration-100"
          // onClick={onConfirm}
          onClick={() => {
            mutate?.();
            refetch?.();
            onClose?.();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
