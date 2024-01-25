const MessageModel = require('../models/MessageModel');

class MessageManager {
  async addMessage(messageData) {
    try {
      const newMessage = new MessageModel(messageData);
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error('Error adding message');
    }
  }

  async getMessages() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      throw new Error('Error getting messages');
    }
  }

  
}

module.exports = MessageManager;
