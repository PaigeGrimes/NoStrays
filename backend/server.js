require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
const StrayReport = require('./models/StrayReport');


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Adjust based on your frontend port
    credentials: true
}));


// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 1000 * 60 * 60 }
}));

app.use(passport.initialize());
app.use(passport.session());

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
app.post('/login', async (req, res, next) => {
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

        req.login(user, err => {
            if (err) return next(err);
            res.json({
                message: 'Login successful',
                userId: user._id,
                accessLevel: user.accessLevel,
                username: user.username,
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Passport Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Invalid username or password' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// **🔥 Login Route**
// app.post('/login', passport.authenticate('local'), (req, res) => {
//     res.json({
//         message: 'Login successful',
//         userId: req.user._id,
//         accessLevel: req.user.accessLevel,
//         username: req.user.username,
//     });
// });

// **🔓 Logout Route**
app.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out' });
    });
});

// **🔍 Get Authenticated User**
app.get('/user', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Not authenticated' });
    res.json({ user: req.user });
});

// **🔐 Protected Route (Admin Only)**
app.get('/admin', (req, res) => {
    if (!req.isAuthenticated() || req.user.accessLevel !== 4) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    res.json({ message: 'Welcome Admin!' });
});

// **🔐 Protected Route (Volunteer Only)**
app.get('/volunteer', (req, res) => {
    if (!req.isAuthenticated() || req.user.accessLevel !== 1) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    res.json({ message: 'Welcome Volunteer!' });
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
app.post('/update-access', async (req, res) => {
    const { username, newAccessLevel } = req.body;

    if (!username || newAccessLevel === undefined) {
        return res.status(400).json({ error: 'Username and new access level are required' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { accessLevel: newAccessLevel },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Access level updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
// Volunteer reports a stray animal
app.post('/api/volunteer/report-stray', async (req, res) => {
    const { username, animalDescription, location, notes } = req.body;

    if (!animalDescription || !location) {
        return res.status(400).json({ error: 'Username, description, and location are required' });
    }

    try {
        const report = new StrayReport({
            reporterUsername: username || 'Unknown', // Provide a default value
            animalDescription,
            location,
            notes
        });
        await report.save();
        res.status(201).json({ message: 'Stray report submitted', report });
    } catch (error) {
        console.error('Error submitting stray report:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Get all pending stray reports (for caregivers to review)
app.get('/api/animalSubmissions/pending', async (req, res) => {
    try {
        const reports = await StrayReport.find();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Accept a stray report and move it to the Animal collection
app.post('/api/animalSubmissions/accept', async (req, res) => {
    const { submissionId, animalName } = req.body;  // Expect the animal name from the frontend

    try {
        const report = await StrayReport.findById(submissionId);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        // Ensure the animal name is provided
        if (!animalName || animalName.trim() === "") {
            return res.status(400).json({ error: 'Animal name is required' });
        }

        // Create a new animal entry
        const newAnimal = new Animal({
            name: animalName,  // Use the name provided by the admin
            species: report.animalDescription, // Default until updated
            location: report.location
        });

        await newAnimal.save();
        await StrayReport.findByIdAndDelete(submissionId);

        res.json({ message: 'Animal added successfully', animal: newAnimal });
    } catch (error) {
        console.error('Error accepting submission:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Deny a stray report (delete it)
app.post('/api/animalSubmissions/deny', async (req, res) => {
    const { submissionId } = req.body;

    try {
        const deletedReport = await StrayReport.findByIdAndDelete(submissionId);
        if (!deletedReport) {
            return res.status(404).json({ error: 'Report not found' });
        }

        res.json({ message: 'Submission denied successfully' });
    } catch (error) {
        console.error('Error denying submission:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// GET /users - returns all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /donations - returns all donations
app.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find({});
        res.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
