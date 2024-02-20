const router = require("express").Router();
const { seedDatabase } = require("../controller/databaseController");

router.get("/seed-database", seedDatabase);

module.exports = router;
