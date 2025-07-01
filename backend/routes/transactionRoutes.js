const express = require("express");
const {
  addTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.use(auth);
router.post("/", addTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
