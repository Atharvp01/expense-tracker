import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [summaryRes, txnRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/transactions/summary/balance`, {
          headers,
        }),
        axios.get(`${API_BASE_URL}/api/transactions`, { headers }),
      ]);
      setSummary(summaryRes.data);
      setTransactions(txnRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {summary && (
        <div className="row text-center mb-4">
          <div className="col">
            <div className="card bg-light">
              <div className="card-body">
                <h5>Total Balance</h5>
                <h3>₹{summary.balance}</h3>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5>Income</h5>
                <h3>₹{summary.totalIncome}</h3>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <h5>Expense</h5>
                <h3>₹{summary.totalExpense}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Recent Transactions</h4>
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          + Add Transaction
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="list-group">
        {transactions
          .filter((txn) =>
            txn.description.toLowerCase().includes(search.toLowerCase()),
          )
          .slice(0, 5)
          .map((txn) => (
            <li
              key={txn._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{txn.description}</strong>
                <br />
                <small className="text-muted">
                  {new Date(txn.date).toLocaleDateString()}
                </small>{" "}
                | <span className="badge bg-secondary">{txn.category}</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span
                  className={`fw-bold ${txn.type === "Income" ? "text-success" : "text-danger"}`}
                >
                  {txn.type === "Income" ? "+" : "-"} ₹{txn.amount}
                </span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/edit/${txn._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(txn._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Dashboard;
