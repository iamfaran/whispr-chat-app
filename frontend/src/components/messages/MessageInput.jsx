import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import { useConversationStore } from "../../zustand/useConversationStore";
import { useAuth } from "../../context/AuthContext";

const MessageInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const { selectedConversation } = useConversationStore();
  const { user } = useAuth();

  console.log(selectedConversation);
  console.log(user);

  const { sendMessage, loading } = useSendMessage();

  const onSubmit = async (data) => {
    // Handle message submission (e.g., send to API)
    await sendMessage(data.message);

    reset(); // Clear the input after sending
  };

  const handleInptChange = (e) => {
    // Handle
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-base-200">
      <div className="relative">
        <input
          type="text"
          {...register("message", {
            required: "Please enter a message",
            onChange: handleInptChange,
          })}
          className={`border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white ${
            errors.message ? "border-red-500" : ""
          }`}
          placeholder="Send a message"
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <IoSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
