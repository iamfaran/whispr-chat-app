import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChat from "./NoChat";
import { useConversationStore } from "../../zustand/useConversationStore";
import { useEffect } from "react";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const isChatSelected = selectedConversation;

  useEffect(() => {
    return () => {
      console.log("unmounting");
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="fixed h-full left-[400px] right-0 top-0 border border-blue-500">
      {!isChatSelected ? (
        <NoChat />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 py-2 mb-4 sticky z-10 top-0">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
