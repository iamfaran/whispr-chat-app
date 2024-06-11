import { IoSearchSharp } from "react-icons/io5";
import { useForm } from "react-hook-form"; // Import useForm
import { useConversationStore } from "../../zustand/useConversationStore";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const { register, handleSubmit } = useForm();
  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversationStore();

  const onSubmit = (data) => {
    const searchQuery = data.search; // Access the search query from data
    setSelectedConversation(
      conversations.find((conversation) =>
        conversation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        {...register("search")} // Register the input
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
