const Joi = require("joi");

const transactionSchema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    amount: Joi.number().positive().required(),
    category: Joi.string().required(),
    note: Joi.string().allow("").optional(),
    date: Joi.date().optional(),
});

module.exports = {
    transactionSchema,
};
