import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Reports from "./pages/Reports";
import EditTransaction from "./pages/EditTransaction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
