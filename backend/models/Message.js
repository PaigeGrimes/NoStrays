// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // If it's a single recipient...
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // If it's a group message...
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // optional, see below
  
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
