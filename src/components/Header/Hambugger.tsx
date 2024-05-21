import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
type HambuggerProps = {
  open: boolean;
  onClick: () => void;
};
const Hambugger = ({ open, onClick }: HambuggerProps) => {
  return (
    <button
      className="btn btn-outline block md:hidden relative z-30"
      onClick={onClick}
    >
      {open ? <IoMdClose /> : <CiMenuFries />}
    </button>
  );
};

export default Hambugger;
