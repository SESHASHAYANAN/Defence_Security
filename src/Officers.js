import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./officers.css";

const Officers = () => {
  const initialOfficers = [
    {
      id: 1,
      name: "Officer Smith",
      status: "Available",
      location: "Downtown",
      specialty: "Cyber Security",
    },
    {
      id: 2,
      name: "Officer Chen",
      status: "On Duty",
      location: "Eastside",
      specialty: "Field Operations",
    },
    {
      id: 3,
      name: "Officer Rodriguez",
      status: "Responding",
      location: "Westside",
      specialty: "Forensics",
    },
    {
      id: 4,
      name: "Officer Patel",
      status: "Available",
      location: "Northside",
      specialty: "Intelligence",
    },
    {
      id: 5,
      name: "Officer Jones",
      status: "On Duty",
      location: "Southside",
      specialty: "Tactical",
    },
    {
      id: 6,
      name: "Officer Miller",
      status: "Off Duty",
      location: "Central",
      specialty: "Investigation",
    },
    {
      id: 7,
      name: "Officer Wilson",
      status: "Available",
      location: "Airport",
      specialty: "Transport Security",
    },
    {
      id: 8,
      name: "Officer Taylor",
      status: "Training",
      location: "HQ",
      specialty: "Crisis Management",
    },
  ];

  const [officers, setOfficers] = useState(initialOfficers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOfficers = officers.filter((officer) => {
    return (
      (statusFilter === "All" || officer.status === statusFilter) &&
      officer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="page-container">
      <header className="header">
        <h1>Officer Management</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/detection" className="nav-link">
            Detection
          </Link>
          <Link to="/officers" className="nav-link active">
            Officers
          </Link>
          <Link to="/analysis" className="nav-link">
            Analysis
          </Link>
          <Link to="/record" className="nav-link">
            Record
          </Link>
          <Link to="/history" className="nav-link">
            History
          </Link>
        </nav>
      </header>

      <div className="page-content">
        <div className="officers-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search officers..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="On Duty">On Duty</option>
              <option value="Responding">Responding</option>
              <option value="Off Duty">Off Duty</option>
              <option value="Training">Training</option>
            </select>
            <button className="primary-button">Add Officer</button>
          </div>
        </div>

        <div className="officers-table-container">
          <table className="officers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Location</th>
                <th>Specialty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.map((officer) => (
                <tr key={officer.id}>
                  <td>{officer.id}</td>
                  <td>{officer.name}</td>
                  <td>
                    <span
                      className={`status-badge ${officer.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {officer.status}
                    </span>
                  </td>
                  <td>{officer.location}</td>
                  <td>{officer.specialty}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button edit">Edit</button>
                      <button className="action-button assign">Assign</button>
                      <button className="action-button view">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="officer-stats">
          <div className="stat-card">
            <h3>Status Summary</h3>
            <div className="stat-content">
              <div className="stat-item">
                <span className="stat-label">Available:</span>
                <span className="stat-value">
                  {officers.filter((o) => o.status === "Available").length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">On Duty:</span>
                <span className="stat-value">
                  {officers.filter((o) => o.status === "On Duty").length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Responding:</span>
                <span className="stat-value">
                  {officers.filter((o) => o.status === "Responding").length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Off Duty:</span>
                <span className="stat-value">
                  {officers.filter((o) => o.status === "Off Duty").length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Training:</span>
                <span className="stat-value">
                  {officers.filter((o) => o.status === "Training").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>AI-Driven Threat Prediction Engine (ATPE) &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Officers;
