import React, { useEffect } from "react";
import LeftChatSidebar from "../../components/LeftChatSidebar/LeftChatSidebar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { routeChange } from "../../utils/routeChange";

const ChatScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      routeChange("/login");
    }
  }, [userInfo]);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <LeftChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatScreen;
