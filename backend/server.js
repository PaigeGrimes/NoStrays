require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');  // Ensure path is imported

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
        process.exit(1); // Exit if DB connection fails
    }
};
connectDB(); // Call the function


// Define Volunteer Schema
const VolunteerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobby: String,
    town: String,
    bio: String,
    code: String,
});
const User = mongoose.model('User', VolunteerSchema);

app.post('/register', async (req, res) => {
    const { name, age, hobby, town, bio } = req.body;

    if (!name || !age || !town) {
        return res.status(400).json({ message: 'Name, age, and town are required.' });
    }


    const code = uuidv4();

    const user = new User({
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

app.post('/register', async (req, res) => {
    const { name, age, hobby, town, bio } = req.body;

    if (!name || !age || !town) {
        return res.status(400).json({ message: 'Name, age, and town are required.' });
    }

    const code = uuidv4();

    const user = new User({
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

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
