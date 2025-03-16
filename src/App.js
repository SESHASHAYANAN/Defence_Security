import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ThreatList from "./ThreatList";
import ControlPanel from "./ControlPanel";
import Dashboard from "./Dashboard";
import Detection from "./Detection";
import Officers from "./Officers";
import Analysis from "./Analysis";
import Record from "./Record";
import History from "./History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/officers" element={<Officers />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/record" element={<Record />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
