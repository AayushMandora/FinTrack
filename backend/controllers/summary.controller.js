const Transaction = require("../models/transaction.model");
const mongoose = require("mongoose")

exports.getSummary = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const [totals, monthly, categoryBreakdown] = await Promise.all([
            Transaction.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: "$type", total: { $sum: "$amount" } } },
            ]),

            Transaction.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                {
                    $group: {
                        _id: { month: { $month: "$date" }, year: { $year: "$date" }, type: "$type" },
                        total: { $sum: "$amount" },
                    },
                },
                { $sort: { "_id.year": -1, "_id.month": -1 } },
                { $limit: 12 },
            ]),

            Transaction.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(userId) } },
                { $group: { _id: { category: "$category", type: "$type" }, total: { $sum: "$amount" } } },
                { $lookup: { from: "categories", localField: "_id.category", foreignField: "_id", as: "category" } },
                { $unwind: "$category" },
                { $project: { total: 1, type: "$_id.type", categoryName: "$category.name" } },
            ]),
        ]);

        const income = totals.find((t) => t._id === "income")?.total || 0;
        const expense = totals.find((t) => t._id === "expense")?.total || 0;

        res.json({ balance: income - expense, income, expense, monthly, categoryBreakdown });
    } catch (err) { next(err); }
};