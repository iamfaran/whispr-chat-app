import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  // TODO: understand why req.params is a reciverId
  // TODO: understand why req.user is the senderId
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // find conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if conversation does not exist, create a new one

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // add message to conversation

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // save message and conversation
    // await newMessage.save();
    // await conversation.save();

    // use Promise.all for parallel execution
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
