import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import {
  createConversation,
  getConversationByUser,
  reset,
} from "../../redux/slices/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import SocketConnection from "../../utils/socketConnection";
import "./styles.scss";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import EmojiPicker from "emoji-picker-react";
import TextActionPopup from "../TextActionPopup/TextActionPopup";
import { deleteMessage } from "../../redux/slices/messageSlice";

const ChatWindow = () => {
  const { data: conversation, error } = useSelector(
    (state) => state.conversation
  );

  const { data: deleted } = useSelector((state) => state.message);

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const [receiverImage, setReceiverImage] = useState("");
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [deletedMessageId, setDeletedMessageId] = useState("");

  const { client } = SocketConnection(user);

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message") {
        setMessages((messages) => [...messages, dataFromServer.data]);
      }
    };
  });
  //   send message and add to messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      const messageObject = {
        type: "message",
        senderId: user?._id,
        receiverId: id,
        message,
      };
      client.send(JSON.stringify(messageObject));
    }
    setMessage("");
  };

  useEffect(() => {
    if (id !== undefined)
      dispatch(getConversationByUser({ senderId: user?._id, receiverId: id }));
  }, [id]);

  useEffect(() => {
    if (
      error &&
      error?.success === false &&
      error?.message === "No Conversations found"
    ) {
      dispatch(reset());
      dispatch(createConversation({ senderId: user?._id, receiverId: id }));
    }
  }, [error]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.data.messages);
      setReceiverName(
        conversation.data.users.find((member) => member?._id !== user?._id).name
      );
      setReceiverImage(
        conversation.data.users.find((member) => member?._id !== user?._id)
          .image
      );
    }
  }, [conversation]);

  // format time if 24 hours ago show date else show time
  const formatTime = (time) => {
    const date = new Date(time);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return date.toLocaleDateString();
    } else {
      return (
        date.toLocaleTimeString().split(":").slice(0, 2).join(":") +
        " " +
        date.toLocaleTimeString().split(" ")[1]
      );
    }
  };

  // scroll to bottom
  useEffect(() => {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  const scrolltoBottom = () => {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow) {
      chatWindow.scrollTo({
        top: chatWindow.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // set popup position based on right click position
  const handleContextMenu = (e) => {
    e.preventDefault();
    // if click position is near to right edge of screen then show popup on left side
    if (window.innerWidth - e.clientX < 150) {
      setPosition({ x: e.clientX - 150, y: e.clientY });
    } else {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    setDeletedMessageId(e.target.dataset.id);
    setShowPopup(true);
  };

  // delete message
  const deleteMessageHandler = () => {
    dispatch(deleteMessage({ messageId: deletedMessageId }));
    setShowPopup(false);
  };

  useEffect(() => {
    if (deleted && deleted.success) {
      setMessages((messages) =>
        messages.filter((message) => message._id !== deletedMessageId)
      );
    }
  }, [deleted]);

  return (
    <div className="w-3/4 h-full bg-slate-300 ">
      {id !== undefined && (
        <>
          {/* navbar with profile icon */}
          <div className="flex flex-row items-center justify-between p-2 bg-slate-300 border-3 border border-b-white">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center w-12 h-12 bg-white rounded-full">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={receiverImage}
                  alt="dp"
                />
              </div>
              <h1 className="ml-2 text-xl font-bold text-white">
                {receiverName}
              </h1>
            </div>
          </div>
          {/* chat window */}
          <div className="flex flex-col  h-[91.3%] justify-between w-full bg-slate-300  ">
            {/* messages */}
            <div
              className="flex flex-col w-full h- overflow-auto chat-window mb-4 "
              // disable scroll when popup is open
              style={{ overflowY: showPopup ? "hidden" : "auto" }}
            >
              {messages &&
                messages.map((message) => (
                  <div
                    key={message._id}
                    className="flex flex-col my-2 max-w-[40%] min-w-[30%] "
                    style={{
                      marginLeft:
                        message?.user?._id !== user?._id ? "0px" : "auto",
                      marginRight:
                        message?.user?._id !== user?._id ? "auto" : "0px",
                    }}
                  >
                    <div
                      className="flex  w-full "
                      style={{
                        flexDirection:
                          message?.user?._id !== user?._id
                            ? "row"
                            : "row-reverse",
                      }}
                      // on right click
                      onContextMenu={handleContextMenu}
                      data-id={message._id}
                    >
                      <TextActionPopup
                        setShowPopup={setShowPopup}
                        // filter message
                        message={
                          messages.filter(
                            (msg) => msg._id.toString() === deletedMessageId
                          )[0]
                        }
                        showPopup={showPopup}
                        position={position}
                        onClick={() => {
                          deleteMessageHandler(message._id);
                        }}
                        user={user}
                      />
                      {/* index > 0 &&
                      messages[index - 1]?.user?._id === message?.user?._id ?  */}
                      <div
                        className="flex flex-col items-start justify-center ml-2 w-2/3 p-3 mt-3"
                        style={{
                          backgroundColor:
                            message?.user?._id !== user?._id
                              ? "#F3F4F6"
                              : "#60A5FA",
                          color:
                            message?.user?._id !== user?._id
                              ? "#60A5FA"
                              : "#F3F4F6",
                          borderRadius:
                            message?.user?._id !== user?._id
                              ? "0px 20px  20px  20px"
                              : " 20px 0px 20px 20px ",
                        }}
                        data-id={message._id}
                      >
                        <p
                          className="text-sm font-normal "
                          data-id={message._id}
                        >
                          {message.message}
                        </p>
                        <p
                          className="text-xs font-normal ml-auto"
                          data-id={message._id}
                        >
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
           
            {/* message input */}
            <div className="flex flex-row items-center justify-between w-full h-[10%] bg-white p-3">
              <input
                type="text"
                name="message"
                id="message"
                placeholder="Type a message"
                className="w-[95%] px-5 py-2 text-base text-gray-700 border-0 rounded-full bg-transparent focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // enter to send message
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage(e);
                  }
                }}
              />
              <div className="flex">
                <div className="relative">
                  <button
                    className="flex flex-row items-center justify-center"
                    onClick={() => setShowPicker(!showPicker)}
                  >
                    <TagFacesIcon
                      sx={{ fontSize: 30 }}
                      className={`mx-2  ${
                        showPicker ? "text-blue-500" : "text-gray-700"
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-7 right-0">
                    {showPicker && (
                      <EmojiPicker
                        onEmojiClick={(emojiObject, e) => {
                          setMessage(message + emojiObject.emoji);
                        }}
                      />
                    )}
                  </div>
                </div>

                <button
                  className="flex flex-row items-center justify-center"
                  onClick={sendMessage}
                >
                  <SendIcon
                    className={`mx-2  ${
                      message.trim().length > 0
                        ? "text-blue-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
