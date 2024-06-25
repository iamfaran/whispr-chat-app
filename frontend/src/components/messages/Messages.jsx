import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
import { useConversationStore } from "../../zustand/useConversationStore";
import { useSocketContext } from "../../context/SocketContext";
const Messages = () => {
  const { selectedConversation, isUserTyping, setIsUserTyping } =
    useConversationStore();
  const recipientId = selectedConversation._id;

  const { socket } = useSocketContext();
  const chatMessagesRef = useRef(null);
  useListenMessages();
  const { messages, loading } = useGetMessages();

  useEffect(() => {
    if (chatMessagesRef.current && !loading) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  console.log(socket);
  useEffect(() => {
    socket.on("userTyping", (data) => {
      if (data.senderId === recipientId) {
        setIsUserTyping(data.senderId);
      }
    });

    socket.on("userTypingStop", (data) => {
      if (data.senderId === recipientId) {
        setIsUserTyping(false);
      }
    });

    return () => {
      socket.off("userTyping");
      socket.off("userTypingStop");
    };
  }, [socket]);
  return (
    <div
      className="overflow-y-scroll h-[calc(100%-150px)] p-4"
      ref={chatMessagesRef}
    >
      {loading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
      <div>
        {isUserTyping && (
          <span className="animate-ping">
            {selectedConversation.fullName} is typing...
          </span>
        )}
      </div>
    </div>
  );
};
export default Messages;
