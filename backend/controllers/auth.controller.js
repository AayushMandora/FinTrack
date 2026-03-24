const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res, next) => {
    try {
        const exists = await User.findOne({ email: req.body.email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashed });

        res.status(201).json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password)))
            return res.status(400).json({ message: "Invalid credentials" });

        res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) { next(err); }
};