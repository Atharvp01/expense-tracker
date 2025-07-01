const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({
    date: -1,
  });
  res.json(transactions);
};

exports.getTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!transaction) return res.status(404).json({ message: "Not found" });
  res.json(transaction);
};

exports.updateTransaction = async (req, res) => {
  const updated = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true },
  );
  res.json(updated);
};

exports.deleteTransaction = async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Deleted" });
};
