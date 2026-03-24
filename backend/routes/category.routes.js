const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { categorySchema } = require("../validations/category.validation");
const { getCategories, createCategory, deleteCategory } = require("../controllers/category.controller");

router.use(auth);
router.get("/", getCategories);
router.post("/", validate(categorySchema), createCategory);
router.delete("/:id", deleteCategory);

module.exports = router;