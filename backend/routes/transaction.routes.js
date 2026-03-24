// routes/transaction.routes.js
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { transactionSchema } = require("../validations/transaction.validation");
const { getAll, getOne, create, remove } = require("../controllers/transaction.controller");

router.use(auth);
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", validate(transactionSchema), create);
router.delete("/:id", remove);

module.exports = router;
