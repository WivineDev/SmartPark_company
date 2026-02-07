const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        req.session.user = { userId: user.userId, username: user.username };
        res.json({ success: true, message: 'Login successful', data: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Could not log out' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
};

exports.checkAuth = (req, res) => {
    if (req.session && req.session.user) {
        res.json({ success: true, message: 'Authenticated', data: req.session.user });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
};
