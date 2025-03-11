require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Set up file upload with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); // Generate unique filename
    },
});

const upload = multer({ storage: storage });


// Define the Volunteer Schema
const VolunteerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    picture: String, // Store the file path of the uploaded image
    hobby: String,
    town: String,
    bio: String,
    code: String,
});

const User = mongoose.model('User', VolunteerSchema);

// Register route (assigns a unique code and handles file upload)
app.post('/register', upload.single('picture'), async (req, res) => {
    const { name, age, hobby, town, bio } = req.body;
    const picture = req.file ? req.file.path : null;  // Get the file path if file is uploaded

    // Validate input
    if (!name || !age || !town) {
        return res.status(400).json({ message: 'Name, age, and town are required.' });
    }

    // Generate a unique code for the user
    const code = uuidv4();  // Generate a unique code using uuid

    // Create a new user
    const user = new User({
        name,
        age,
        picture,  // Store the file path of the uploaded image
        hobby,
        town,
        bio,
        code,  // Save the unique code in the database
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.json({ message: 'User registered successfully', code });
});

// Login route (authenticates using the unique code)
app.post('/login', async (req, res) => {
    const { code } = req.body;

    // Validate input
    if (!code) {
        return res.status(400).json({ message: 'Code is required' });
    }

    // Find the user by code
    const user = await User.findOne({ code });
    if (!user) {
        return res.status(400).json({ message: 'Invalid code' });
    }

    // Generate a token (JWT)
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    // Send the token and user data in the response
    res.json({ token, user });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
