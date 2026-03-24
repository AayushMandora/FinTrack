const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getSummary } = require("../controllers/summary.controller");

router.get("/", auth, getSummary);

module.exports = router;