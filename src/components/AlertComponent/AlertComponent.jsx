// AlertComponent
import React, { useState } from "react";

const AlertComponent = ({ type, message, onClose }) => {
  const [isShow, setIsShow] = useState(true);

  setTimeout(() => {
    setIsShow(false);
  }, 3000);
  return (
    isShow && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 my-3 rounded flex justify-between items-center">
        <p>
          <strong className="font-bold">{type}! </strong>
          <span className="block sm:inline">{message}</span>
        </p>

        <button
          className="text-red-700 hover:text-red-900 text-3xl font-semibold "
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    )
  );
};

export default AlertComponent;
