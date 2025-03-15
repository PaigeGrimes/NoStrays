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

const DonationSchema = new mongoose.Schema({
    name: String,
    amount:Number,
    message: String,
    ccNum: Number,
    ccv: Number,
    ccExpiration: Date,
    zipCode: Number
    }
);

const Donation = mongoose.model('Donation', DonationSchema);

app.post('/donation', async (req, res) => {
    let { name, amount, message, ccNum, ccv, ccExpiration, zipCode } = req.body;

    // Default name to 'anonymous' if not provided
    if (!name) {
        name = 'anonymous';
    }

    // Check if required fields are missing
    if (!amount || !ccNum || !ccv || !ccExpiration || !zipCode) {
        return res.status(400).json({ message: 'Amount, credit card number, CCV, expiration date, and zip code are required.' });
    }

    // Validate credit card number length
    if (ccNum.toString().length !== 16) {
        return res.status(400).json({ message: "Credit Card number must be 16 digits." });
    }

    // Validate CCV length
    if (ccv.toString().length !== 3) {
        return res.status(400).json({ message: "The CCV must be 3 digits." });
    }

    // Validate zip code length
    if (zipCode.toString().length !== 5) {
        return res.status(400).json({ message: "The zip code must be 5 digits." });
    }

    // Save donation to database
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


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
