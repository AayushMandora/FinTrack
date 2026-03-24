const Joi = require("joi");

const categorySchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("income", "expense").required(),
});

module.exports = {
    categorySchema,
};
