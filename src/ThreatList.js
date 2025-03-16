import React from "react";

function ThreatList({ threats, onSelectThreat, selectedThreatId }) {
  // Sort threats by severity (high to low) and then by timestamp (newest first)
  const sortedThreats = [...threats].sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="threat-list">
      <h2>Detected Threats ({threats.length})</h2>
      {sortedThreats.length === 0 ? (
        <p className="no-threats">No threats detected.</p>
      ) : (
        <ul className="threats">
          {sortedThreats.map((threat) => (
            <li
              key={threat.id}
              className={`threat-item ${threat.severity} ${
                selectedThreatId === threat.id ? "selected" : ""
              }`}
              onClick={() => onSelectThreat(threat)}
            >
              <div className="threat-header">
                <span
                  className={`severity-indicator ${threat.severity}`}
                ></span>
                <span className="threat-time">
                  {new Date(threat.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="threat-desc">{threat.description}</p>
              <div className="threat-footer">
                <span className="confidence">
                  Confidence: {threat.confidence}%
                </span>
                {threat.assignedOfficer && (
                  <span className="assigned-badge">
                    <i className="fa fa-user"></i> Assigned
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ThreatList;
