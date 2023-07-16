import React from "react";

const RightChatSidebar = () => {
  return (
    <div className="w-1/4 h-full bg-slate-400">
      {/* user info with message options */}
      <div className="flex flex-row items-center justify-between p-2 bg-slate-400 border-3 border border-b-white">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-row items-center justify-center w-12 h-12 bg-white rounded-full">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src="https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg"
              alt="dp"
            />
          </div>
          <h1 className="ml-2 text-xl font-bold text-white">John Doe</h1>
        </div>
        <div className="flex flex-row items-center justify-center w-10 h-10 bg-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RightChatSidebar;
