import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { useConversationStore } from "../../zustand/useConversationStore";
import convertTime from "../../utils/convertTime";

const Message = ({ message }) => {
  const { selectedConversation } = useConversationStore();
  const { user } = useAuth();

  const isMe = message.senderId === user._id;
  const chatBubble = isMe ? "chat-end" : "chat-start";
  const pic = isMe ? user.profilePic : selectedConversation?.profilePic || "";
  const chatColor = isMe ? "chat-bubble-info" : "chat-bubble-primary";

  return (
    <div className={`chat ${chatBubble}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={pic} alt="user avatar" />{" "}
        </div>
      </div>
      <div className={`chat-bubble pb-2 ${chatColor}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        <div>{convertTime(message.createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.object.isRequired,
};
