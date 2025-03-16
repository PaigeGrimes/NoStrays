require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

// User Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['volunteer', 'caregiver', 'hr', 'board_member', 'ceo'] }
});
const User = mongoose.model('User', UserSchema);

// Animal Model
const AnimalSchema = new mongoose.Schema({
    name: String,
    species: String,
    healthStatus: String,
    assignedCaregiver: String
});
const Animal = mongoose.model('Animal', AnimalSchema);

// Message Model
const MessageSchema = new mongoose.Schema({
    sender: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Register API
app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name, email, role } });
});

// Login API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

});

// Fetch Animals API
app.get('/api/animals', async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});

// Fetch Messages API
app.get('/api/messages', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
});

// Post a Message API
app.post('/api/messages', async (req, res) => {
    const { sender, text } = req.body;
    const message = new Message({ sender, text });
    await message.save();
    res.json(message);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
