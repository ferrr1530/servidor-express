const MessageModel = require('../dao/models/MessageModel');

const messageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await MessageModel.find();
      res.status(200).json({ status: 'success', payload: messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  createMessage: async (req, res) => {
    const { user, message } = req.body;

    try {
      const newMessage = new MessageModel({ user, message });
      const savedMessage = await newMessage.save();

      res.status(201).json({ status: 'success', payload: savedMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },
};

module.exports = messageController;