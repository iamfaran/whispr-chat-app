export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    res.status(200).json({ id, message });
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
