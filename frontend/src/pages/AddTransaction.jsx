import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/api";

function AddTransaction() {
  const [formData, setFormData] = useState({
    amount: "",
    type: "Expense",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${API_BASE_URL}/api/transactions`, formData, {
        headers,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Transaction</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="number"
          name="amount"
          className="form-control mb-2"
          placeholder="Amount (e.g. 500)"
          onChange={handleChange}
          required
        />

        <select
          name="type"
          className="form-control mb-2"
          onChange={handleChange}
          value={formData.type}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <input
          type="text"
          name="category"
          className="form-control mb-2"
          placeholder="Category (e.g. Groceries)"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          className="form-control mb-2"
          placeholder="Description (e.g. Bought vegetables)"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="form-control mb-3"
          value={formData.date}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
