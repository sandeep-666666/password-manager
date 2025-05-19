import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-slate-800 text-white items-center justify-center translate-y-12 gap-4 translate-y-72 bottom-0">
      <div>
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
      </div>
      <div className="mb-1">
        Created with
        <lord-icon
          src="https://cdn.lordicon.com/dqhmanhc.json"
          trigger="hover"
          colors="primary:#c71f16,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#911710"
        ></lord-icon>
        by Sandeep
      </div>
    </div>
  );
};

export default Footer;
