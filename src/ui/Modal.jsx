import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(name) });
}

function Window({ children, name }) {
  const ref = useOutsideClick(() => close());

  const { close, openName } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div
        ref={ref}
        className="dark:bg-bg-dark fixed left-1/2 top-1/2 min-w-80 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-50 px-5 py-4 shadow-lg"
      >
        <button type="button" className="w-full" onClick={close}>
          <HiXMark className="absolute left-5 top-6 mr-auto size-6 fill-gray-800 dark:fill-gray-100" />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
