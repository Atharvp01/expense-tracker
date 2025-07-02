import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);
import API_BASE_URL from "../services/api";

function Reports() {
  const [categorySummary, setCategorySummary] = useState({});
  const [monthlySummary, setMonthlySummary] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [catRes, monthRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/transactions/summary/categories`, {
          headers,
        }),
        axios.get(`${API_BASE_URL}/api/transactions/summary/monthly`, {
          headers,
        }),
      ]);

      setCategorySummary(catRes.data);
      setMonthlySummary(monthRes.data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  const pieData = {
    labels: Object.keys(categorySummary),
    datasets: [
      {
        label: "Category Expenses",
        data: Object.values(categorySummary).map((val) => val.expense),
        backgroundColor: [
          "#007bff",
          "#28a745",
          "#dc3545",
          "#ffc107",
          "#6f42c1",
          "#17a2b8",
        ],
      },
    ],
  };

  const barData = {
    labels: monthlySummary.map((item) => item.month),
    datasets: [
      {
        label: "Income",
        data: monthlySummary.map((item) => item.income),
        backgroundColor: "rgba(40, 167, 69, 0.7)",
      },
      {
        label: "Expense",
        data: monthlySummary.map((item) => item.expense),
        backgroundColor: "rgba(220, 53, 69, 0.7)",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Reports</h2>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5 className="text-center">Expenses by Category</h5>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h5 className="text-center">Monthly Summary</h5>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
