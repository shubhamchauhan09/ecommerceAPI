const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.AUTH_SECRET_KEY;


exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(password == user.password)) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate and sign a JWT token
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.signup = async(req, res, next) => {
    try {
        const { username, password, isAdmin } = req.body;

        let user = await User.findOne({ username });
        // Check if the username is already taken
        if (user) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Create the user and store in the database
        const newUser = User.create({ username, password, isAdmin });

        // Generate and sign a JWT token for the new user
        const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        next(err);
    }
};