import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 px-4 h-14 text-white">
      <div className="mycontainer flex justify-between items-center py-2">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4 ">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="flex bg-slate-700 border rounded-full px-2 border-black hover:bg-slate-800 transition-all duration-200 items-center">
          <lord-icon
            src="https://cdn.lordicon.com/jjxzcivr.json"
            trigger="hover"
            colors="primary:#242424,secondary:#08a88a"
          ></lord-icon>
          github
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
