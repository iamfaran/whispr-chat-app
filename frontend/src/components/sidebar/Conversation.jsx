import PropTypes from "prop-types";
import { useConversationStore } from "../../zustand/useConversationStore";
import { useSocketContext } from "../../context/SocketContext";
const Conversation = ({ conversation, lastIdx }) => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } =
    useConversationStore((state) => ({
      selectedConversation: state.selectedConversation,
      setSelectedConversation: state.setSelectedConversation,
    }));

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id)
    ? "online"
    : "offline";

  return (
    <>
      <div
        onClick={() => {
          setSelectedConversation(conversation);
        }}
        className={`flex gap-2
        ${isSelected ? "bg-sky-500" : "hover:bg-sky-500"}
        items-center rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic || "https://i.pravatar.cc/300"}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider mx-2"></div>}
    </>
  );
};
export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  lastIdx: PropTypes.bool.isRequired,
};
