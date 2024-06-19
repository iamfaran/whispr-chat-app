import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChat from "./NoChat";
import { useConversationStore } from "../../zustand/useConversationStore";
import { useEffect } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
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

  // if convo is selected make convo overlay on top of sidebar on mobile / Make convo full screen

  const isMobile = selectedConversation ? "left-0" : "left-full";

  return (
    <div
      className={`fixed h-full ${isMobile} bg-black sm:left-[300px] transition-[left] right-0 top-0 border border-blue-500 sm:block`}
    >
      {!isChatSelected ? (
        <NoChat />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 p-4 mb-4 sticky z-10 top-0">
            <div className="flex gap-4">
              <div className=" block sm:hidden">
                <MdOutlineArrowBackIos
                  className=" text-2xl cursor-pointer text-primary font-bold"
                  onClick={() => setSelectedConversation(null)}
                />
              </div>
              <div>
                <span className="label-text">To:</span>{" "}
                <span className="text-gray-900 font-bold">
                  {selectedConversation.fullName}
                </span>
              </div>
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
