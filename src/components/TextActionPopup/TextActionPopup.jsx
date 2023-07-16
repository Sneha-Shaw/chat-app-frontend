import React, { useEffect, useState } from "react";

const TextActionPopup = ({
  setShowPopup,
  message,
  showPopup,
  position,
  onClick,
  user,
}) => {
  // hide popup on click outside
  const handleClickOutside = () => {
    setShowPopup(false);
  };
  console.log(message);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    showPopup && (
      <div
        className="absolute z-50 w-40 h-min bg-white rounded-md shadow-sm"
        style={{ top: position.y, left: position.x }}
      >
        <button
          className="w-full h-10 flex items-center justify-center hover:bg-gray-200"
          onClick={() => {
            setShowPopup(false);
            navigator.clipboard.writeText(message.message);
          }}
        >
          Copy Text
        </button>
        {user._id === message?.user?._id && (
          <button
            className="w-full h-10 flex items-center justify-center hover:bg-gray-200"
            onClick={onClick}
          >
            Delete Message
          </button>
        )}
      </div>
    )
  );
};

export default TextActionPopup;
