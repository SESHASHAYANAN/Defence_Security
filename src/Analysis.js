import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bar, Line, Pie } from "recharts";
import { MapPin, AlertTriangle } from "lucide-react";
import "./Analysis.css";

const Analysis = () => {
  const [showCriminalPopup, setShowCriminalPopup] = useState(false);
  const [selectedCriminal, setSelectedCriminal] = useState(null);

  // Sample threat data for analysis
  const threatsByType = [
    { type: "Cyber Attack", count: 24, severity: "High" },
    { type: "Suspicious Gathering", count: 18, severity: "Medium" },
    { type: "Unauthorized Access", count: 15, severity: "High" },
    { type: "Structural Damage", count: 12, severity: "Low" },
    { type: "Supply Chain Disruption", count: 9, severity: "Medium" },
  ];

  const threatsBySeverity = {
    high: 38,
    medium: 27,
    low: 16,
  };

  const recentTrendData = [
    { month: "Jan", threats: 18 },
    { month: "Feb", threats: 22 },
    { month: "Mar", threats: 19 },
    { month: "Apr", threats: 25 },
    { month: "May", threats: 31 },
    { month: "Jun", threats: 28 },
  ];

  // New data: Annual safety trend
  const annualSafetyData = [
    { month: "Jan", safetyScore: 76 },
    { month: "Feb", safetyScore: 78 },
    { month: "Mar", safetyScore: 75 },
    { month: "Apr", safetyScore: 73 },
    { month: "May", safetyScore: 70 },
    { month: "Jun", safetyScore: 68 },
    { month: "Jul", safetyScore: 65 },
    { month: "Aug", safetyScore: 67 },
    { month: "Sep", safetyScore: 70 },
    { month: "Oct", safetyScore: 72 },
    { month: "Nov", safetyScore: 74 },
    { month: "Dec", safetyScore: 76 },
  ];

  // Top criminals data
  const topCriminals = [
    {
      id: 1,
      name: "James Wilson",
      age: 34,
      crimes: 7,
      status: "At Large",
      lastSeen: "Downtown Area",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 2,
      name: "Robert Miller",
      age: 29,
      crimes: 5,
      status: "In Custody",
      lastSeen: "Police Station",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 3,
      name: "Lisa Johnson",
      age: 31,
      crimes: 4,
      status: "At Large",
      lastSeen: "North District",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 4,
      name: "Michael Brown",
      age: 42,
      crimes: 6,
      status: "At Large",
      lastSeen: "Industrial Zone",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 5,
      name: "Emily Davis",
      age: 28,
      crimes: 5,
      status: "In Custody",
      lastSeen: "County Jail",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      age: 39,
      crimes: 8,
      status: "At Large",
      lastSeen: "Southside",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=6",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      age: 26,
      crimes: 3,
      status: "In Custody",
      lastSeen: "Transit Center",
      threatLevel: "Low",
      image: "https://picsum.photos/100/100?random=7",
    },
    {
      id: 8,
      name: "Daniel Kim",
      age: 35,
      crimes: 9,
      status: "At Large",
      lastSeen: "Financial District",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=8",
    },
    {
      id: 9,
      name: "Olivia Thompson",
      age: 41,
      crimes: 6,
      status: "In Custody",
      lastSeen: "Court House",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=9",
    },
    {
      id: 10,
      name: "William Harris",
      age: 33,
      crimes: 10,
      status: "At Large",
      lastSeen: "Riverfront",
      threatLevel: "Extreme",
      image: "https://picsum.photos/100/100?random=10",
    },
    {
      id: 11,
      name: "Ava White",
      age: 27,
      crimes: 4,
      status: "In Custody",
      lastSeen: "Shopping Mall",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=11",
    },
    {
      id: 12,
      name: "Ethan Moore",
      age: 38,
      crimes: 7,
      status: "At Large",
      lastSeen: "University Campus",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=12",
    },
    {
      id: 13,
      name: "Mia Clark",
      age: 29,
      crimes: 5,
      status: "In Custody",
      lastSeen: "Hospital Area",
      threatLevel: "Medium",
      image: "https://picsum.photos/100/100?random=13",
    },
    {
      id: 14,
      name: "Benjamin Scott",
      age: 45,
      crimes: 12,
      status: "At Large",
      lastSeen: "Highway Rest Stop",
      threatLevel: "Extreme",
      image: "https://picsum.photos/100/100?random=14",
    },
    {
      id: 15,
      name: "Charlotte Adams",
      age: 31,
      crimes: 6,
      status: "In Custody",
      lastSeen: "Police HQ",
      threatLevel: "High",
      image: "https://picsum.photos/100/100?random=15",
    },
  ];

  const topOfficers = [
    {
      name: "Capt. Sarah Reynolds",
      solvedCases: 32,
      commendations: 5,
      image: "https://picsum.photos/80/80?random=16",
    },
    {
      name: "Lt. David Chen",
      solvedCases: 28,
      commendations: 4,
      image: "https://picsum.photos/80/80?random=17",
    },
    {
      name: "Sgt. Marcus Johnson",
      solvedCases: 26,
      commendations: 3,
      image: "https://picsum.photos/80/80?random=18",
    },
    {
      name: "Det. Amanda Lee",
      solvedCases: 24,
      commendations: 4,
      image: "https://picsum.photos/80/80?random=19",
    },
    {
      name: "Chief Frank Morrison",
      solvedCases: 23,
      commendations: 5,
      image: "https://picsum.photos/80/80?random=20",
    },
    {
      name: "Officer Rachel Park",
      solvedCases: 21,
      commendations: 3,
      image: "https://picsum.photos/80/80?random=21",
    },
    {
      name: "Cmdr. Brian Taylor",
      solvedCases: 19,
      commendations: 4,
      image: "https://picsum.photos/80/80?random=22",
    },
    {
      name: "Insp. Maria Gonzalez",
      solvedCases: 18,
      commendations: 3,
      image: "https://picsum.photos/80/80?random=23",
    },
    {
      name: "Det. Lucas Wright",
      solvedCases: 17,
      commendations: 2,
      image: "https://picsum.photos/80/80?random=24",
    },
    {
      name: "Sgt. Emily Carter",
      solvedCases: 16,
      commendations: 3,
      image: "https://picsum.photos/80/80?random=25",
    },
    {
      name: "Lt. Samuel Grant",
      solvedCases: 15,
      commendations: 2,
      image: "https://picsum.photos/80/80?random=26",
    },
    {
      name: "Officer Priya Patel",
      solvedCases: 14,
      commendations: 2,
      image: "https://picsum.photos/80/80?random=27",
    },
    {
      name: "Capt. Alex Ramirez",
      solvedCases: 13,
      commendations: 3,
      image: "https://picsum.photos/80/80?random=28",
    },
    {
      name: "Det. Sophia Kim",
      solvedCases: 12,
      commendations: 2,
      image: "https://picsum.photos/80/80?random=29",
    },
    {
      name: "Chief Mark Thompson",
      solvedCases: 11,
      commendations: 1,
      image: "https://picsum.photos/80/80?random=30",
    },
  ];

  // Case statistics
  const caseStatistics = {
    totalCases: 143,
    solvedCases: 112,
    unsolvedCases: 31,
    coldCases: 8,
    activeCases: 23,
    solveRate: "78%",
  };

  // Crime types distribution
  const crimeDistribution = [
    { type: "Theft", count: 47 },
    { type: "Assault", count: 28 },
    { type: "Fraud", count: 24 },
    { type: "Vandalism", count: 19 },
    { type: "Other", count: 25 },
  ];

  const responseMetrics = {
    averageResponseTime: "14 minutes",
    resolvedThreats: 64,
    unresolvedThreats: 17,
    responseRatio: "79%",
  };

  const handleCriminalClick = (criminal) => {
    setSelectedCriminal(criminal);
    setShowCriminalPopup(true);
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Threat Analysis</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/detection" className="nav-link">
            Detection
          </Link>
          <Link to="/officers" className="nav-link">
            Officers
          </Link>
          <Link to="/analysis" className="nav-link active">
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
        <div className="analysis-summary">
          <div className="summary-card total-threats">
            <h3>Total Threats</h3>
            <div className="summary-value">81</div>
            <div className="summary-change positive">+12% from last month</div>
          </div>

          <div className="summary-card resolved">
            <h3>Resolved</h3>
            <div className="summary-value">64</div>
            <div className="summary-change positive">+8% from last month</div>
          </div>

          <div className="summary-card response-time">
            <h3>Avg Response</h3>
            <div className="summary-value">14m</div>
            <div className="summary-change negative">+2m from last month</div>
          </div>

          <div className="summary-card high-severity">
            <h3>High Severity</h3>
            <div className="summary-value">38</div>
            <div className="summary-change negative">+15% from last month</div>
          </div>
        </div>

        {/* Annual Safety Score Chart */}
        <div className="annual-safety">
          <h3>Annual Area Safety Assessment</h3>
          <div className="safety-chart">
            <div className="chart-container">
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color safe"></span> Safe (80-100)
                </span>
                <span className="legend-item">
                  <span className="legend-color moderate"></span> Moderate
                  (60-79)
                </span>
                <span className="legend-item">
                  <span className="legend-color concerning"></span> Concerning
                  (0-59)
                </span>
              </div>
              <div className="line-chart">
                {annualSafetyData.map((item, index) => (
                  <div className="chart-point" key={index}>
                    <div
                      className={`point-marker ${
                        item.safetyScore >= 80
                          ? "safe"
                          : item.safetyScore >= 60
                          ? "moderate"
                          : "concerning"
                      }`}
                      style={{ bottom: `${item.safetyScore}%` }}
                      title={`${item.month}: ${item.safetyScore}%`}
                    ></div>
                    {index > 0 && (
                      <div
                        className="point-connector"
                        style={{
                          bottom: `${
                            (annualSafetyData[index - 1].safetyScore +
                              item.safetyScore) /
                            2
                          }%`,
                          height: `${Math.abs(
                            annualSafetyData[index - 1].safetyScore -
                              item.safetyScore
                          )}%`,
                          transform:
                            annualSafetyData[index - 1].safetyScore >
                            item.safetyScore
                              ? "none"
                              : "rotate(180deg)",
                        }}
                      ></div>
                    )}
                    <div className="point-label">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="safety-assessment">
              <h4>Safety Trend Analysis</h4>
              <p>
                The area has seen fluctuations in safety scores over the past
                year. The first quarter showed relative stability, followed by a
                decline in the second quarter. Recent months indicate a recovery
                trend with improving safety metrics.
              </p>
              <div className="recommendation-box">
                <h5>Recommended Action</h5>
                <p>
                  Increase patrol frequency in North and Industrial sectors
                  where most safety incidents have been reported in the past 90
                  days.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-charts">
          <div className="chart-container">
            <h3>Threats by Type</h3>
            <div className="chart-placeholder">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Threat Type</th>
                    <th>Count</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {threatsByType.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.count}</td>
                      <td>
                        <span
                          className={`severity-badge ${item.severity.toLowerCase()}`}
                        >
                          {item.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-container">
            <h3>Threats by Severity</h3>
            <div className="chart-placeholder severity-chart">
              <div className="severity-bar">
                <div
                  className="severity-segment high"
                  style={{
                    width: `${
                      (threatsBySeverity.high /
                        (threatsBySeverity.high +
                          threatsBySeverity.medium +
                          threatsBySeverity.low)) *
                      100
                    }%`,
                  }}
                >
                  High: {threatsBySeverity.high}
                </div>
                <div
                  className="severity-segment medium"
                  style={{
                    width: `${
                      (threatsBySeverity.medium /
                        (threatsBySeverity.high +
                          threatsBySeverity.medium +
                          threatsBySeverity.low)) *
                      100
                    }%`,
                  }}
                >
                  Medium: {threatsBySeverity.medium}
                </div>
                <div
                  className="severity-segment low"
                  style={{
                    width: `${
                      (threatsBySeverity.low /
                        (threatsBySeverity.high +
                          threatsBySeverity.medium +
                          threatsBySeverity.low)) *
                      100
                    }%`,
                  }}
                >
                  Low: {threatsBySeverity.low}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="trend-analysis">
          <h3>Threat Trends (6 Month)</h3>
          <div className="trend-chart-placeholder">
            <div className="trend-bars">
              {recentTrendData.map((item, index) => (
                <div className="trend-bar-container" key={index}>
                  <div
                    className="trend-bar"
                    style={{
                      height: `${
                        (item.threats /
                          Math.max(...recentTrendData.map((d) => d.threats))) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div className="trend-label">{item.month}</div>
                  <div className="trend-value">{item.threats}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Statistics Section */}
        <div className="case-statistics">
          <h3>Case Statistics</h3>
          <div className="case-metrics">
            <div className="case-metric">
              <div className="case-metric-value">
                {caseStatistics.totalCases}
              </div>
              <div className="case-metric-label">Total Cases</div>
            </div>
            <div className="case-metric solved">
              <div className="case-metric-value">
                {caseStatistics.solvedCases}
              </div>
              <div className="case-metric-label">Solved</div>
            </div>
            <div className="case-metric unsolved">
              <div className="case-metric-value">
                {caseStatistics.unsolvedCases}
              </div>
              <div className="case-metric-label">Unsolved</div>
            </div>
            <div className="case-metric">
              <div className="case-metric-value">
                {caseStatistics.solveRate}
              </div>
              <div className="case-metric-label">Solve Rate</div>
            </div>
          </div>

          <div className="case-distribution">
            <div className="case-pie-chart">
              <div className="pie-placeholder">
                <div
                  className="pie-segment solved"
                  style={{
                    transform: "rotate(0deg)",
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)",
                  }}
                ></div>
                <div
                  className="pie-segment active"
                  style={{
                    transform: "rotate(280deg)",
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 75% 0%, 100% 25%, 100% 50%)",
                  }}
                ></div>
                <div
                  className="pie-segment cold"
                  style={{
                    transform: "rotate(340deg)",
                    clipPath: "polygon(50% 50%, 50% 0%, 60% 0%, 60% 20%)",
                  }}
                ></div>
                <div className="pie-center">
                  <span>{caseStatistics.solveRate}</span>
                  <span>Solve Rate</span>
                </div>
              </div>
            </div>
            <div className="case-stats">
              <div className="stat-item">
                <div className="stat-label">Active Cases:</div>
                <div className="stat-value">{caseStatistics.activeCases}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Cold Cases:</div>
                <div className="stat-value">{caseStatistics.coldCases}</div>
              </div>
              <div className="stat-note">
                <div className="stat-note">
                  <p>
                    Cases older than 2 years with no new leads are classified as
                    cold cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crime Distribution Section */}
        <div className="crime-distribution">
          <h3>Crime Distribution by Type</h3>
          <div className="crime-chart">
            {crimeDistribution.map((crime, index) => (
              <div className="crime-bar" key={index}>
                <div className="crime-bar-label">{crime.type}</div>
                <div className="crime-bar-container">
                  <div
                    className="crime-bar-fill"
                    style={{
                      width: `${
                        (crime.count /
                          crimeDistribution.reduce(
                            (acc, curr) => acc + curr.count,
                            0
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div className="crime-bar-value">{crime.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Officers Section */}
        <div className="top-officers">
          <h3>Top Performing Officers</h3>
          <div className="officers-container">
            {topOfficers.map((officer, index) => (
              <div className="officer-card" key={index}>
                <div className="officer-img">
                  <img src={officer.image} alt={officer.name} />
                  <div className="officer-rank">{index + 1}</div>
                </div>
                <div className="officer-info">
                  <h4>{officer.name}</h4>
                  <div className="officer-stats">
                    <div className="stat">
                      <span className="stat-label">Solved Cases:</span>
                      <span className="stat-value">{officer.solvedCases}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Commendations:</span>
                      <span className="stat-value">
                        {officer.commendations}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Wanted Criminals Section */}
        <div className="most-wanted">
          <h3>High Profile Subjects</h3>
          <div className="criminals-grid">
            {topCriminals.map((criminal) => (
              <div
                className={`criminal-card ${
                  criminal.status === "At Large" ? "at-large" : ""
                }`}
                key={criminal.id}
                onClick={() => handleCriminalClick(criminal)}
              >
                <div className="criminal-img">
                  <img src={criminal.image} alt={criminal.name} />
                  {criminal.status === "At Large" && (
                    <div className="criminal-alert">
                      <AlertTriangle size={16} />
                    </div>
                  )}
                </div>
                <div className="criminal-info">
                  <h4>{criminal.name}</h4>
                  <div className="criminal-meta">
                    <span>Age: {criminal.age}</span>
                    <span>Crimes: {criminal.crimes}</span>
                  </div>
                  <div
                    className={`criminal-status ${criminal.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {criminal.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="response-metrics">
          <h3>Response Metrics</h3>
          <div className="metrics-container">
            <div className="metric-card">
              <h4>Average Response Time</h4>
              <div className="metric-value">
                {responseMetrics.averageResponseTime}
              </div>
            </div>
            <div className="metric-card">
              <h4>Resolved Threats</h4>
              <div className="metric-value">
                {responseMetrics.resolvedThreats}
              </div>
            </div>
            <div className="metric-card">
              <h4>Unresolved Threats</h4>
              <div className="metric-value">
                {responseMetrics.unresolvedThreats}
              </div>
            </div>
            <div className="metric-card">
              <h4>Resolution Ratio</h4>
              <div className="metric-value">
                {responseMetrics.responseRatio}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Criminal Detail Popup */}
      {showCriminalPopup && selectedCriminal && (
        <div className="criminal-popup">
          <div className="criminal-popup-content">
            <div className="popup-header">
              <h3>Subject Profile</h3>
              <button
                className="close-btn"
                onClick={() => setShowCriminalPopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              <div className="criminal-details">
                <div className="criminal-photo">
                  <img
                    src={selectedCriminal.image}
                    alt={selectedCriminal.name}
                  />
                  <div
                    className={`threat-level ${selectedCriminal.threatLevel.toLowerCase()}`}
                  >
                    {selectedCriminal.threatLevel} Threat
                  </div>
                </div>
                <div className="criminal-info-detailed">
                  <h4>{selectedCriminal.name}</h4>
                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span className="info-value">{selectedCriminal.age}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span
                      className={`info-value status-${selectedCriminal.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {selectedCriminal.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Crimes:</span>
                    <span className="info-value">
                      {selectedCriminal.crimes}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Seen:</span>
                    <span className="info-value location">
                      <MapPin size={14} /> {selectedCriminal.lastSeen}
                    </span>
                  </div>
                </div>
              </div>
              <div className="criminal-actions">
                <button className="action-btn report">Report Sighting</button>
                <button className="action-btn history">
                  View Case History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>AI-Driven Threat Prediction Engine (ATPE) &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Analysis;
