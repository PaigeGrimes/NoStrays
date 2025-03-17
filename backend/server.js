// Load .env at the very top. 
// If your file is literally named `.env` in the same directory, 
// you can do just require('dotenv').config(). 
// Otherwise, specify the path to your file explicitly:
require('dotenv').config({ path: './.env' });

// Then proceed with your imports:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();

// Import your models so they're available
const Message = require('./models/Message');
const Group = require('./models/Group');

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to Cosmos DB (or any MongoDB)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Typically recommended Mongoose options:
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // If you still have certificate issues, you can try:
      // sslValidate: false,
      // or: tlsAllowInvalidCertificates: true
    });
    console.log("Connected to Cosmos DB");
  } catch (err) {
    console.error("Cosmos DB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB(); // Call the function

// Define Volunteer Schema
const VolunteerSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  age: Number,
  hobby: String,
  town: String,
  bio: String,
  code: String,
  accessLevel: {
    type: Number,
    default: 1
  }
});
const User = mongoose.model('User', VolunteerSchema);

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password, name, age, hobby, town, bio } = req.body;
    if (!name || !age || !town) {
      return res.status(400).json({ message: 'Name, age, and town are required.' });
    }

    // If desired, hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const code = uuidv4();
    const user = new User({
      username,
      // password: hashedPassword,
      password,
      name,
      age,
      hobby,
      town,
      bio,
      code,
    });

    await user.save();
    res.json({ message: 'User registered successfully', code });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Define Donation Schema
const DonationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  message: String,
  ccNum: Number,
  ccv: Number,
  ccExpiration: Date,
  zipCode: Number
});
const Donation = mongoose.model('Donation', DonationSchema);

// Donation route
app.post('/donation', async (req, res) => {
  try {
    let { name, amount, message, ccNum, ccv, ccExpiration, zipCode } = req.body;

    if (!amount || !ccNum || !ccv || !ccExpiration || !zipCode) {
      return res.status(400).json({ message: 'Amount, credit card number, CCV, expiration date, and zip code are required.' });
    }

    if (ccNum.toString().length !== 16) {
      return res.status(400).json({ message: "Credit Card number must be 16 digits." });
    }
    if (ccv.toString().length !== 3) {
      return res.status(400).json({ message: "The CCV must be 3 digits." });
    }
    if (zipCode.toString().length !== 5) {
      return res.status(400).json({ message: "The zip code must be 5 digits." });
    }

    if (!name) {
      name = 'anonymous';
    }

    const donation = new Donation({
      name,
      amount,
      message,
      ccNum,
      ccv,
      ccExpiration,
      zipCode
    });
    await donation.save();
    res.json({ message: 'Thank you for your donation!' });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare hashed password if you hashed it on registration
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Return success
    res.json({
      message: 'Login successful',
      userId: user._id,
      accessLevel: user.accessLevel
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /messages - direct or group
app.post('/messages', async (req, res) => {
  try {
    const { senderId, recipientId, content, groupId } = req.body;
    if (!senderId || !content || (!recipientId && !groupId)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let newMessage = new Message({ sender: senderId, content });
    if (groupId) {
      newMessage.group = groupId;
    } else {
      newMessage.recipient = recipientId;
    }

    await newMessage.save();
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /messages/:userId - fetch direct & group messages for a user
app.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Direct messages
    const directMessages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
      .populate('sender', 'username')
      .populate('recipient', 'username')
      .sort({ createdAt: -1 });

    // Group messages
    const userGroups = await Group.find({ members: userId }, '_id');
    const groupIds = userGroups.map((g) => g._id);

    const groupMessages = await Message.find({
      group: { $in: groupIds }
    })
      .populate('sender', 'username')
      .populate('group')
      .sort({ createdAt: -1 });

    // Return them
    res.json({ directMessages, groupMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /messages/by-username - direct message by passing recipient's username
app.post('/messages/by-username', async (req, res) => {
  try {
    const { senderId, recipientUsername, content } = req.body;
    if (!senderId || !recipientUsername || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const recipientUser = await User.findOne({ username: recipientUsername });
    if (!recipientUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientUser._id,
      content
    });

    await newMessage.save();
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message by username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
