require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
const path = require('path');  // Ensure path is imported
const bcrypt = require('bcrypt');

const app = express();
const Message = require('./models/Message');
const Group = require('./models/Group');
app.use(express.json());
app.use(cors());

// Connect to CosmosDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {tls: true});
        console.log("Connected to Cosmos DB");
    } catch (err) {
        console.error("Cosmos DB connection error:", err);
        process.exit(1); // Exit if DB connection fails
    }
};
connectDB(); // Call the function

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
        type: Number, default: 0
    }
});
const User = mongoose.model('User', VolunteerSchema);

// Register Route
app.post('/register', async (req, res) => {
    const {username, password, name, age, hobby, town, bio} = req.body;

    if (!username || !password || !name || !age || !town) {
        return res.status(400).json({message: 'Name, age, and town are required.'});
    }
    // 1️⃣ Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already taken. Please choose another." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username, password: hashedPassword, name, age, hobby, town, bio,
    });

    await user.save();
    res.json({message: 'User registered successfully'});
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
    let {name, amount, message, ccNum, ccv, ccExpiration, zipCode} = req.body;

    // Default name to 'anonymous' if not provided
    if (!name) {
        name = 'anonymous';
    }

    // Check if required fields are missing
    if (!amount || !ccNum || !ccv || !ccExpiration || !zipCode) {
        return res.status(400).json({message: 'Amount, credit card number, CCV, expiration date, and zip code are required.'});
    }

    // Validate credit card number length
    if (ccNum.toString().length !== 16) {
        return res.status(400).json({message: "Credit Card number must be 16 digits."});
    }

    // Validate CCV length
    if (ccv.toString().length !== 3) {
        return res.status(400).json({message: "The CCV must be 3 digits."});
    }

    // Validate zip code length
    if (zipCode.toString().length !== 5) {
        return res.status(400).json({message: "The zip code must be 5 digits."});
    }

    // Save donation to database
    try {
        const donation = new Donation({
            name, amount, message, ccNum, ccv, ccExpiration, zipCode
        });
        await donation.save();
        res.json({message: 'Thank you for your donation!'});
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({message: "Internal server error."});
    }
});


//login route
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        // a) Find the user
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // b) Compare the password with what's stored in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // c) If match, (optionally) generate token or just return success
        return res.json({
            message: 'Login successful', userId: user._id, accessLevel: user.accessLevel, // If you added that field
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

// POST /messages - send a message to a single user or to a group
app.post('/messages', async (req, res) => {
    try {
        const {senderId, recipientId, content, groupId} = req.body;

        // Basic check
        if (!senderId || !content || (!recipientId && !groupId)) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        // If groupId is provided, handle group message
        // Otherwise, it's a direct user-to-user message
        let newMessage = new Message({
            sender: senderId, content: content
        });

        if (groupId) {
            newMessage.group = groupId;
        } else {
            newMessage.recipient = recipientId;
        }

        await newMessage.save();
        return res.json({message: 'Message sent successfully'});
    } catch (error) {
        console.error('Error sending message', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});
//get messages for a particular user
app.get('/messages/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        // 1) Direct messages to/from the user
        const directMessages = await Message.find({
            $or: [{sender: userId}, {recipient: userId}]
        })
            .populate('sender', 'username')
            .populate('recipient', 'username')
            .sort({createdAt: -1}); // newest first

        // 2) Group messages for groups the user is a member of
        //    First, find all group IDs where the user is a member
        const userGroups = await Group.find({members: userId}, '_id');
        const groupIds = userGroups.map(g => g._id);

        const groupMessages = await Message.find({
            group: {$in: groupIds}
        })
            .populate('sender', 'username')
            .populate('group')  // you can populate group name, etc.
            .sort({createdAt: -1});

        // Combine them if you want or send separately
        res.json({directMessages, groupMessages});

    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// POST /messages/by-username - send a message by passing recipient's username
app.post('/messages/by-username', async (req, res) => {
    try {
        const {senderId, recipientUsername, content} = req.body;

        // 1) Basic checks
        if (!senderId || !recipientUsername || !content) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        // 2) Look up the user by username
        const recipientUser = await User.findOne({username: recipientUsername});
        if (!recipientUser) {
            return res.status(404).json({message: 'User not found'});
        }

        // 3) Create the message using the found user's _id
        const newMessage = new Message({
            sender: senderId, recipient: recipientUser._id, content
        });

        // 4) Save to DB
        await newMessage.save();
        return res.json({message: 'Message sent successfully'});

    } catch (error) {
        console.error('Error sending message by username:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.get('/hr', async (req, res) => {
    try {
        // Fetch users with only name and accessLevel fields
        const users = await User.find({}, 'name accessLevel');

        // Fetch donations with only name, amount, and message fields
        const donations = await Donation.find({}, 'name amount message');

        // Send response with both users and donations
        res.json({ users, donations });

    } catch (error) {
        console.error('Error fetching HR data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/update-access', async (req, res) => {
    try {
        const { userId, accessLevel } = req.body;

        // Validate required fields
        if (!userId || !accessLevel) {
            return res.status(400).json({ message: 'User ID and new access level are required.' });
        }

        // Find the user and update the accessLevel
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { accessLevel },
            { new: true, runValidators: true } // Returns the updated document and ensures validation rules are applied
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Access level updated successfully.', user: updatedUser });

    } catch (error) {
        console.error('Error updating access level:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
