const router = require("express").Router();
const authRoute = require("./routes/auth.routes");
const transactionRoute = require("./routes/transaction.routes");
const categoryRoute = require("./routes/category.routes");
const summaryRoute = require("./routes/summary.routes");

router.use("/auth", authRoute);
router.use("/transactions", transactionRoute);
router.use("/categories", categoryRoute);
router.use("/summary", summaryRoute);

module.exports = router;
