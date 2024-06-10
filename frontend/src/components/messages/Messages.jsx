import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("Messages: ", messages, "Loading: ", loading);
  return (
    <div className="px-4 flex-1 overflow-auto">
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
