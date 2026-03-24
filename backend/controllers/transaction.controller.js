const Transaction = require("../models/transaction.model");

exports.create = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({ ...req.body, user: req.user.id });

        res.status(201).json(transaction);
    } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        const filter = { user: req.user.id };

        if (type) filter.type = type;
        if (category) filter.category = category;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(filter)
            .populate("category", "name type")
            .sort({ date: -1 });

        res.json(transactions);
    } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.id })
            .populate("category", "name type");

        if (!transaction) return res.status(404).json({ message: "Not found" });

        res.json(transaction);
    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!transaction) return res.status(404).json({ message: "Not found" });

        res.json({ message: "Deleted" });
    } catch (err) { next(err); }
};