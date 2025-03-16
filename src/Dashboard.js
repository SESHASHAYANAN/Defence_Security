import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import ThreatList from "./ThreatList";
import ControlPanel from "./ControlPanel";

import Detection from "./Detection";
import Officers from "./Officers";
import Analysis from "./Analysis";
import Record from "./Record";
import History from "./History";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Different marker icons based on threat level
const threatIcons = {
  high: new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    className: "high-threat-marker", // Will be styled with CSS to have red color
  }),
  medium: new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    className: "medium-threat-marker", // Will be styled with CSS to have orange color
  }),
  low: new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    className: "low-threat-marker", // Will be styled with CSS to have yellow color
  }),
};

// Groq API configuration
const GROQ_API_KEY = "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";

// Function to analyze threat data using Groq API
const analyzeThreatsWithGroq = async (threatData) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [
            {
              role: "system",
              content:
                "You are an AI security analyst. Analyze the provided threat data and provide a concise analysis, risk level, and recommended actions.",
            },
            {
              role: "user",
              content: `Analyze this potential security threat: ${JSON.stringify(
                threatData
              )}`,
            },
          ],
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "Unable to analyze threat with AI. Please check manually.";
  }
};

// Simulated threat generation function with enhanced data sources
const generateSimulatedThreats = async (dataSources) => {
  // Check if any data source is active
  if (!Object.values(dataSources).some((source) => source.active)) {
    return {
      error:
        "No data sources selected. Please enable at least one data source.",
    };
  }

  // Define possible threat locations
  const possibleLocations = [
    { latitude: 40.7128, longitude: -74.006 }, // New York
    { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
    { latitude: 41.8781, longitude: -87.6298 }, // Chicago
    { latitude: 29.7604, longitude: -95.3698 }, // Houston
    { latitude: 39.9526, longitude: -75.1652 }, // Philadelphia
    { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    { latitude: 33.4484, longitude: -112.074 }, // Phoenix
    { latitude: 47.6062, longitude: -122.3321 }, // Seattle
    { latitude: 30.2672, longitude: -97.7431 }, // Austin
    { latitude: 42.3601, longitude: -71.0589 }, // Boston
  ];

  // Generate 1-3 threats based on active data sources
  const numberOfThreats = Math.floor(Math.random() * 3) + 1;
  const threats = [];

  // Define possible threat types based on data sources
  const threatTypes = [];
  if (dataSources.socialMedia.active) {
    threatTypes.push({
      prefix: "Social media indicates ",
      threats: [
        "suspicious gathering",
        "protest organization",
        "misinformation campaign",
        "coordinated online attack",
      ],
    });
  }

  if (dataSources.satelliteImagery.active) {
    threatTypes.push({
      prefix: "Satellite imagery shows ",
      threats: [
        "unusual vehicle movements",
        "structural damage risk",
        "unauthorized construction",
        "environmental hazard",
      ],
    });
  }

  if (dataSources.intelligenceReports.active) {
    threatTypes.push({
      prefix: "Intelligence reports suggest ",
      threats: [
        "potential cyber attack",
        "supply chain disruption",
        "insider threat activity",
        "imminent security breach",
      ],
    });
  }

  if (dataSources.cctv && dataSources.cctv.active) {
    threatTypes.push({
      prefix: "CCTV footage reveals ",
      threats: [
        "suspicious behavior near facility",
        "unauthorized access attempt",
        "unusual crowd formation",
        "potential vandalism activity",
      ],
    });
  }

  // Generate nearby officers for threat assignment
  const generateNearbyOfficers = () => {
    const officerCount = Math.floor(Math.random() * 3) + 1;
    const officers = [];

    for (let i = 0; i < officerCount; i++) {
      officers.push({
        id: `officer-${Math.random().toString(36).substring(2, 8)}`,
        name: `Officer ${
          ["Jones", "Smith", "Rodriguez", "Chen", "Patel"][
            Math.floor(Math.random() * 5)
          ]
        }`,
        distance: `${(Math.random() * 10).toFixed(1)} miles`,
        eta: `${Math.floor(Math.random() * 20) + 5} minutes`,
        status: ["Available", "On duty", "Responding"][
          Math.floor(Math.random() * 3)
        ],
      });
    }

    return officers;
  };

  // Generate each threat
  for (let i = 0; i < numberOfThreats; i++) {
    // Select random location
    const location =
      possibleLocations[Math.floor(Math.random() * possibleLocations.length)];

    // Select random threat type
    const threatTypeCategory =
      threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const threatText =
      threatTypeCategory.threats[
        Math.floor(Math.random() * threatTypeCategory.threats.length)
      ];
    const description = threatTypeCategory.prefix + threatText;

    // Determine severity
    const severityOptions = ["low", "medium", "high"];
    const severity =
      severityOptions[Math.floor(Math.random() * severityOptions.length)];

    // Generate recommendations based on severity
    let recommendedActions;
    if (severity === "high") {
      recommendedActions =
        "Immediate response required. Alert all relevant authorities.";
    } else if (severity === "medium") {
      recommendedActions = "Monitor closely and prepare response team.";
    } else {
      recommendedActions = "Continue routine monitoring. Document findings.";
    }

    // Generate confidence score
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%

    // Determine data sources that contributed to this threat
    const contributingSources = [];
    Object.entries(dataSources).forEach(([key, source]) => {
      if (source.active && Math.random() > 0.5) {
        contributingSources.push(key);
      }
    });

    // Generate nearby officers
    const nearbyOfficers = generateNearbyOfficers();

    // Create threat object
    const threat = {
      id: Math.random().toString(36).substring(2, 15),
      description,
      location,
      severity,
      recommendedActions,
      confidence,
      timestamp: new Date().toISOString(),
      contributingSources,
      nearbyOfficers,
      assignedOfficer: null,
    };

    // Add AI analysis using Groq for high severity threats
    if (severity === "high") {
      try {
        threat.aiAnalysis = await analyzeThreatsWithGroq(threat);
      } catch (error) {
        console.error("Error analyzing threat with Groq:", error);
        threat.aiAnalysis = "AI analysis unavailable";
      }
    }

    threats.push(threat);
  }

  return { threats };
};

// Main App component split into main app and dashboard
const Dashboard = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(30000); // 30 seconds by default
  const [simulatedData, setSimulatedData] = useState({
    socialMedia: {
      active: true,
      data: "Multiple reports of suspicious activities in the downtown area.",
    },
    satelliteImagery: {
      active: true,
      data: "Unusual vehicle movements detected near critical infrastructure.",
    },
    intelligenceReports: {
      active: true,
      data: "Recent intelligence suggests heightened risk of cyber attacks.",
    },
    cctv: {
      active: true,
      data: "Suspicious behavior detected near key facilities.",
    },
    trafficCameras: {
      active: false,
      data: "Unusual traffic patterns observed in central district.",
    },
    emergencyCalls: {
      active: false,
      data: "Increase in emergency calls from downtown area.",
    },
  });
  const [selectedMapType, setSelectedMapType] = useState("standard");
  const [selectedThreat, setSelectedThreat] = useState(null);

  const assignOfficerToThreat = (threatId, officerId) => {
    setThreats((prevThreats) =>
      prevThreats.map((threat) => {
        if (threat.id === threatId) {
          const assignedOfficer = threat.nearbyOfficers.find(
            (officer) => officer.id === officerId
          );
          return {
            ...threat,
            assignedOfficer,
          };
        }
        return threat;
      })
    );
  };

  const detectThreats = useCallback(async () => {
    if (!Object.values(simulatedData).some((source) => source.active)) {
      setError(
        "No data sources selected. Please enable at least one data source."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate simulated threats
      const result = await generateSimulatedThreats(simulatedData);

      if (result.error) {
        setError(result.error);
      } else if (Array.isArray(result.threats)) {
        setThreats((prevThreats) => {
          // Combine new threats with existing ones, avoiding duplicates by ID
          const existingIds = new Set(prevThreats.map((t) => t.id));
          const uniqueNewThreats = result.threats.filter(
            (t) => !existingIds.has(t.id)
          );
          return [...prevThreats, ...uniqueNewThreats];
        });
      }
    } catch (error) {
      console.error("Error detecting threats:", error);
      setError("Failed to detect threats: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [simulatedData]);

  // Initial threat detection on load
  useEffect(() => {
    detectThreats();

    // Set up polling interval
    const intervalId = setInterval(detectThreats, pollingInterval);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [detectThreats, pollingInterval]);

  const handleClearThreats = () => {
    setThreats([]);
  };

  const handleUpdateDataSource = (source, isActive, newData) => {
    setSimulatedData((prev) => ({
      ...prev,
      [source]: {
        active: isActive !== undefined ? isActive : prev[source].active,
        data: newData || prev[source].data,
      },
    }));
  };

  const handleUpdatePollingInterval = (newInterval) => {
    setPollingInterval(newInterval);
  };

  const handleMapTypeChange = (type) => {
    setSelectedMapType(type);
  };

  // Define different map tile layers based on selected type
  const getMapTileLayer = () => {
    switch (selectedMapType) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
      case "dark":
        return "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>ORCA Threat Prediction Engine</h1>
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

      <div className="main-content">
        <div className="map-container">
          <div className="map-controls">
            <select
              value={selectedMapType}
              onChange={(e) => handleMapTypeChange(e.target.value)}
              className="map-type-selector"
            >
              <option value="standard">Standard Map</option>
              <option value="satellite">Satellite Imagery</option>
              <option value="terrain">Terrain Map</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <MapContainer center={[39.8283, -98.5795]} zoom={4} className="map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={getMapTileLayer()}
            />
            {threats.map((threat) => (
              <Marker
                key={threat.id}
                position={[
                  threat.location.latitude || 39.8283,
                  threat.location.longitude || -98.5795,
                ]}
                icon={threatIcons[threat.severity] || threatIcons.medium}
                eventHandlers={{
                  click: () => {
                    setSelectedThreat(threat);
                  },
                }}
              >
                <Popup className="enhanced-popup">
                  <div className="threat-popup">
                    <h3>{threat.description}</h3>
                    <p>
                      <strong>Severity:</strong>{" "}
                      <span className={`severity-${threat.severity}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                    </p>
                    <p>
                      <strong>Confidence:</strong> {threat.confidence}%
                    </p>
                    <p>
                      <strong>Action:</strong> {threat.recommendedActions}
                    </p>

                    <div className="threat-sources">
                      <h4>Data Sources:</h4>
                      <ul>
                        {threat.contributingSources &&
                          threat.contributingSources.map((source) => (
                            <li key={source}>{source}</li>
                          ))}
                      </ul>
                    </div>

                    {threat.aiAnalysis && (
                      <div className="ai-analysis">
                        <h4>AI Analysis:</h4>
                        <p>{threat.aiAnalysis}</p>
                      </div>
                    )}

                    <div className="nearby-officers">
                      <h4>Nearby Personnel:</h4>
                      {threat.nearbyOfficers &&
                      threat.nearbyOfficers.length > 0 ? (
                        <div>
                          {threat.assignedOfficer ? (
                            <div className="assigned-officer">
                              <p>
                                <strong>Assigned:</strong>{" "}
                                {threat.assignedOfficer.name} (
                                {threat.assignedOfficer.status})
                              </p>
                              <p>ETA: {threat.assignedOfficer.eta}</p>
                              <button className="reassign-button">
                                Reassign
                              </button>
                            </div>
                          ) : (
                            <ul>
                              {threat.nearbyOfficers.map((officer) => (
                                <li key={officer.id} className="officer-item">
                                  <div className="officer-info">
                                    <p>
                                      {officer.name} ({officer.distance})
                                    </p>
                                    <p>Status: {officer.status}</p>
                                  </div>
                                  <button
                                    className="assign-button"
                                    onClick={() =>
                                      assignOfficerToThreat(
                                        threat.id,
                                        officer.id
                                      )
                                    }
                                  >
                                    Assign
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <p>No personnel available in this area.</p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="sidebar">
          <ControlPanel
            onDetectThreats={detectThreats}
            onClearThreats={handleClearThreats}
            loading={loading}
            dataSources={simulatedData}
            onUpdateDataSource={handleUpdateDataSource}
            pollingInterval={pollingInterval}
            onUpdatePollingInterval={handleUpdatePollingInterval}
          />

          <div className="sidebar-buttons">
            <Link to="/detection" className="sidebar-button">
              <i className="fa fa-search"></i> Detection
            </Link>
            <Link to="/officers" className="sidebar-button">
              <i className="fa fa-user-shield"></i> Officers
            </Link>
            <Link to="/analysis" className="sidebar-button">
              <i className="fa fa-chart-bar"></i> Analysis
            </Link>
            <Link to="/record" className="sidebar-button">
              <i className="fa fa-clipboard"></i> Record
            </Link>
            <Link to="/history" className="sidebar-button">
              <i className="fa fa-history"></i> History
            </Link>
          </div>

          {selectedThreat && (
            <div className="threat-detail-panel">
              <h3>Threat Details</h3>
              <button
                className="close-button"
                onClick={() => setSelectedThreat(null)}
              >
                ×
              </button>
              <div className="threat-detail-content">
                <p>
                  <strong>Description:</strong> {selectedThreat.description}
                </p>
                <p>
                  <strong>Severity:</strong> {selectedThreat.severity}
                </p>
                <p>
                  <strong>Confidence:</strong> {selectedThreat.confidence}%
                </p>
                <p>
                  <strong>Detected:</strong>{" "}
                  {new Date(selectedThreat.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedThreat.location.latitude.toFixed(4)},{" "}
                  {selectedThreat.location.longitude.toFixed(4)}
                </p>
                <p>
                  <strong>Recommended Action:</strong>{" "}
                  {selectedThreat.recommendedActions}
                </p>

                {selectedThreat.assignedOfficer && (
                  <div className="assigned-officer-detail">
                    <h4>Assigned Personnel</h4>
                    <p>{selectedThreat.assignedOfficer.name}</p>
                    <p>Status: {selectedThreat.assignedOfficer.status}</p>
                    <p>ETA: {selectedThreat.assignedOfficer.eta}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <ThreatList
            threats={threats}
            onSelectThreat={setSelectedThreat}
            selectedThreatId={selectedThreat?.id}
          />

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      <footer className="footer">
        <p>AI-Driven Threat Prediction Engine (ATPE) &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
