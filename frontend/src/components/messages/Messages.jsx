import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const chatMessagesRef = useRef(null);
  useListenMessages();
  const { messages, loading } = useGetMessages();
  console.log("Messages: ", messages, "Loading: ", loading);

  useEffect(() => {
    if (chatMessagesRef.current && !loading) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);
  return (
    <div className="px-4 flex-1 overflow-auto" ref={chatMessagesRef}>
      {loading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
};
export default Messages;
