import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  console.log("Rendering MessageInput...");
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

  const { sendMessage, loading } = useSendMessage();

  const onSubmit = async (data) => {
    // Handle message submission (e.g., send to API)
    await sendMessage(data.message);

    reset(); // Clear the input after sending
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed bottom-0 left-0 sm:left-[300px] right-0  p-4 bg-base-200"
    >
      <div className="relative">
        <input
          type="text"
          {...register("message", { required: "Please enter a message" })}
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
