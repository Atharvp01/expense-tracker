import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/api";

function EditTransaction() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const txn = res.data;
        txn.date = txn.date.slice(0, 10); // format YYYY-MM-DD
        setFormData(txn);
      })
      .catch((err) => {
        alert("Transaction not found");
        navigate("/");
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/transactions/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!formData) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="number"
          name="amount"
          className="form-control mb-2"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="form-control mb-2"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <input
          type="text"
          name="category"
          className="form-control mb-2"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          className="form-control mb-2"
          value={formData.description}
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
        <button className="btn btn-success w-100">Update Transaction</button>
      </form>
    </div>
  );
}

export default EditTransaction;
