const Category = require("../models/category.model");

exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create({ ...req.body, user: req.user.id });

        res.status(201).json(category);
    } catch (err) { next(err); }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({
            $or: [{ isDefault: true }, { user: req.user.id }],
        });

        res.json(categories);
    } catch (err) { next(err); }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!category) return res.status(404).json({ message: "Not found or not allowed" });

        res.json({ message: "Deleted" });
    } catch (err) { next(err); }
};