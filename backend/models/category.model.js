const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ["income", "expense"], required: true },
        isDefault: { type: Boolean, default: false },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null, // null = predefined/global category
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);