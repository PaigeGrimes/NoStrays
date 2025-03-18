require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to CosmosDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { tls: true });
        console.log("Connected to Cosmos DB");
    } catch (err) {
        console.error("Cosmos DB connection error:", err);
        process.exit(1);
    }
};
connectDB();

// Import Models
const Message = require('./models/Message');
const Group = require('./models/Group');

// Volunteer Schema & Model
const VolunteerSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    age: Number,
    hobby: String,
    town: String,
    bio: String,
    accessLevel: {
        type: Number,
        default: 1
    }
});
const User = mongoose.model('User', VolunteerSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { username, password, name, age, hobby, town, bio } = req.body;

    if (!name || !age || !town) {
        return res.status(400).json({ message: 'Name, age, and town are required.' });
    }

    const code = uuidv4();

    // Hash the password before storing (recommended)
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashed,
        name,
        age,
        hobby,
        town,
        bio,
        code,
    });

    await user.save();
    res.json({ message: 'User registered successfully', code });
});

// Donation Schema & Model
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

// Donation Route
app.post('/donation', async (req, res) => {
    let { name, amount, message, ccNum, ccv, ccExpiration, zipCode } = req.body;

    if (!name) {
        name = 'anonymous';
    }
    if (!amount || !ccNum || !ccv || !ccExpiration || !zipCode) {
        return res.status(400).json({
            message: 'Amount, credit card number, CCV, expiration date, and zip code are required.'
        });
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

    try {
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
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        return res.json({
            message: 'Login successful',
            userId: user._id,
            accessLevel: user.accessLevel,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Send Message (Single or Group)
app.post('/messages', async (req, res) => {
    try {
        const { senderId, recipientId, content, groupId } = req.body;

        if (!senderId || !content || (!recipientId && !groupId)) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let newMessage = new Message({
            sender: senderId,
            content: content
        });

        if (groupId) {
            newMessage.group = groupId;
        } else {
            newMessage.recipient = recipientId;
        }

        await newMessage.save();
        return res.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Messages for a Particular User
app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // 1) Direct messages
        const directMessages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        })
            .populate('sender', 'username')
            .populate('recipient', 'username')
            .sort({ createdAt: -1 });

        // 2) Group messages (groups the user is in)
        const userGroups = await Group.find({ members: userId }, '_id');
        const groupIds = userGroups.map(g => g._id);

        const groupMessages = await Message.find({
            group: { $in: groupIds }
        })
            .populate('sender', 'username')
            .populate('group')
            .sort({ createdAt: -1 });

        res.json({ directMessages, groupMessages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Send Message by Username
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
        return res.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message by username:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const Animal = require('./models/Animal'); // or import Animal from './models/Animal.js';

app.get('/animals', async (req, res) => {
    try {
        const animals = await Animal.find({});
        res.json(animals);
    } catch (err) {
        console.error('Error fetching animals:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
