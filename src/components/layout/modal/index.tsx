"use client";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  onClose: () => void;
};

export default function Modal(props: ModalProps) {
  const { children, open, onClose, className, ...rest } = props;
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const handler = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("close", handler);
    dialog.addEventListener("cancel", handler);
    return () => {
      dialog.removeEventListener("close", handler);
      dialog.removeEventListener("cancel", handler);
    };
  }, [onClose]);

  return (
    <>
      <dialog
        open={open}
        ref={ref}
        className={twMerge("group", className)}
        {...rest}
      >
        <div className="fixed inset-0 grid place-content-center bg-black/75">
          <div className="w-full max-w-lg bg-white p-4 shadow-lg">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
