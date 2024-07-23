import React from "react";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal: React.FC<PropTypes> = ({ open, onClose, children }) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/50 backdrop-blur-sm" : "invisible"}`}>
        <div className={`bg-zinc-700 rounded-lg shadow p-6 transition-all w-96 h-fit ${open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"}`}
            onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 py-1 px-2 border-none text-zinc-50 bg-transaparent hover:text-amber-400"
                onClick={onClose}>
                X
            </button>
            {children}
        </div>
    </div>
  );
};

export default Modal;
