import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Check,
  X,
  User,
  ChevronDown,
  Shield,
  Users,
  AlertTriangle,
  Radio,
} from "lucide-react";
import "./Record2.css";

// Sample data - this would typically come from an API
const incidents = [
  {
    id: 1,
    date: "2025-03-15",
    time: "14:30",
    location: "Central Park, West Side",
    issue: "Suspicious activity",
    resolved: true,
    officer: {
      name: "Officer Sarah Johnson",
      badge: "BDG-4532",
      statement:
        "Responded to a call about suspicious individuals. Upon arrival, found two individuals matching the description. After questioning, it was determined they were tourists who were lost. Provided directions and conducted a routine check. No further action required.",
    },
    offenders: [],
    cctvAvailable: false,
    detailedReport:
      "At 14:30, dispatch received a call from a concerned citizen about two individuals behaving suspiciously near the west entrance of Central Park. Officer Johnson was dispatched and arrived at the scene at 14:42. The individuals were identified as tourists from Germany who were consulting a map and looking for directions to the Metropolitan Museum of Art. After verifying their identification and providing directions, the situation was resolved at 15:05.",
  },
  {
    id: 2,
    date: "2025-03-14",
    time: "23:15",
    location: "Main Street & 5th Avenue",
    issue: "Vandalism",
    resolved: true,
    officer: {
      name: "Officer Michael Rodriguez",
      badge: "BDG-3298",
      statement:
        "Responded to reports of vandalism. Found one suspect at the scene spraying graffiti on a storefront. Suspect attempted to flee but was apprehended. Store owner will press charges.",
    },
    offenders: [
      {
        name: "John Doe",
        age: 22,
        priorOffenses:
          "Two prior arrests for vandalism and one for trespassing",
        currentStatus:
          "Released on bail, court date scheduled for April 10, 2025",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 23:15, Officer Rodriguez responded to a call reporting ongoing vandalism at the corner of Main Street and 5th Avenue. Upon arrival, the officer observed an individual actively spraying graffiti on the storefront of 'City Electronics'. The suspect, later identified as John Doe (22), attempted to flee the scene but was apprehended after a brief pursuit. The store owner was contacted and elected to press charges. CCTV footage from the store's security system confirmed the incident. The suspect has prior arrests for similar offenses. Evidence was collected and documented, including photographs of the vandalism and the spray paint can used. The case has been forwarded to the district attorney's office.",
  },
  {
    id: 3,
    date: "2025-03-16",
    time: "08:45",
    location: "Riverside Apartments, Building C",
    issue: "Breaking and entering",
    resolved: false,
    officer: {
      name: "Officer David Chen",
      badge: "BDG-7621",
      statement:
        "Responding to reports of a break-in at Riverside Apartments. Investigation is ongoing. Forensics team has collected evidence and we're reviewing security footage from the building.",
    },
    offenders: [
      {
        name: "Unknown",
        age: "Unknown",
        priorOffenses: "N/A",
        currentStatus: "At large, investigation ongoing",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 08:45, a resident of Riverside Apartments reported signs of forced entry upon returning home from a night shift. Officer Chen arrived at 09:03 and confirmed evidence of breaking and entering. The apartment was ransacked with several valuable items reported missing, including electronics and jewelry. The forensics team was called to process the scene and collect evidence including fingerprints and tool marks from the door frame. Building security cameras captured footage of a suspicious individual entering the building at approximately 02:30, though facial features were obscured. Neighboring residents are being interviewed for any additional information. The investigation remains active and ongoing.",
  },
];

// New data for red zones and criminal offenders
const redZones = [
  {
    id: 1,
    name: "Downtown East Side",
    threatLevel: "High",
    crimeTypes: ["Assault", "Drug Trafficking", "Theft"],
    description:
      "Increased criminal activity reported in the last 30 days. Multiple gang-related incidents.",
    recentIncidents: 17,
    coordinates: "40.7128° N, 74.0060° W",
    knownOffenders: [
      {
        id: 101,
        name: "Michael 'Razor' Thompson",
        age: 33,
        description:
          "Known gang member. Multiple convictions for assault and drug distribution.",
        lastSeen: "2025-03-14",
        warrants: 2,
        dangerLevel: "High",
        affiliations: "East Side Crew",
      },
      {
        id: 102,
        name: "Anthony Richards",
        age: 28,
        description:
          "Suspected drug dealer with ties to local gangs. History of violence.",
        lastSeen: "2025-03-15",
        warrants: 1,
        dangerLevel: "Medium",
        affiliations: "Independent",
      },
    ],
  },
  {
    id: 2,
    name: "Riverside Park Area",
    threatLevel: "Medium",
    crimeTypes: ["Breaking and Entering", "Robbery", "Vandalism"],
    description:
      "Series of break-ins reported in residential buildings near the park. Pattern suggests organized group.",
    recentIncidents: 12,
    coordinates: "40.7831° N, 73.9712° W",
    knownOffenders: [
      {
        id: 201,
        name: "James 'Ghost' Wilson",
        age: 31,
        description:
          "Known for sophisticated break-ins. Leaves no fingerprints. Previously served 5 years for burglary.",
        lastSeen: "2025-03-12",
        warrants: 3,
        dangerLevel: "Medium",
        affiliations: "Suspected leader of 'Shadow Crew'",
      },
    ],
  },
  {
    id: 3,
    name: "Westside Industrial Zone",
    threatLevel: "Critical",
    crimeTypes: ["Armed Robbery", "Carjacking", "Assault"],
    description:
      "Multiple violent incidents reported in the last week. Area is considered highly dangerous after dark.",
    recentIncidents: 23,
    coordinates: "40.7589° N, 73.9851° W",
    knownOffenders: [
      {
        id: 301,
        name: "Victor Mendez",
        age: 35,
        description:
          "Violent offender with history of armed robbery. Considered armed and dangerous.",
        lastSeen: "2025-03-16",
        warrants: 4,
        dangerLevel: "Critical",
        affiliations: "Former member of 'Los Lobos' gang",
      },
      {
        id: 302,
        name: "Derek 'Ice' Johnson",
        age: 26,
        description:
          "Known for carjackings and violent assaults. Multiple firearms violations.",
        lastSeen: "2025-03-15",
        warrants: 2,
        dangerLevel: "High",
        affiliations: "West Side Militia",
      },
    ],
  },
];

// New data for patrol officers
const patrolOfficers = [
  {
    id: 1,
    name: "Lt. James Sullivan",
    badge: "BDG-1122",
    rank: "Lieutenant",
    area: "Downtown East Side",
    yearsOfService: 15,
    specialization: "Gang Activity",
    team: [
      { id: 101, name: "Officer Maria Rodriguez", badge: "BDG-3344" },
      { id: 102, name: "Officer Robert Chen", badge: "BDG-3345" },
      { id: 103, name: "Officer Sarah Johnson", badge: "BDG-4532" },
    ],
    vehicleId: "PD-511",
    shift: "08:00 - 16:00",
  },
  {
    id: 2,
    name: "Sgt. Diana Washington",
    badge: "BDG-2233",
    rank: "Sergeant",
    area: "Riverside Park Area",
    yearsOfService: 12,
    specialization: "Robbery Investigation",
    team: [
      { id: 201, name: "Officer David Chen", badge: "BDG-7621" },
      { id: 202, name: "Officer Thomas Wilson", badge: "BDG-7622" },
    ],
    vehicleId: "PD-305",
    shift: "16:00 - 00:00",
  },
  {
    id: 3,
    name: "Cpt. Marcus Reynolds",
    badge: "BDG-0512",
    rank: "Captain",
    area: "Westside Industrial Zone",
    yearsOfService: 20,
    specialization: "Tactical Operations",
    team: [
      { id: 301, name: "Officer Michael Rodriguez", badge: "BDG-3298" },
      { id: 302, name: "Officer Jennifer Park", badge: "BDG-3299" },
      { id: 303, name: "Officer William Miller", badge: "BDG-3300" },
      { id: 304, name: "Officer Keisha Brown", badge: "BDG-3301" },
    ],
    vehicleId: "PD-101",
    shift: "00:00 - 08:00",
  },
];

// Available backup officers
const availableBackupOfficers = [
  {
    id: 401,
    name: "Officer Alex Martinez",
    badge: "BDG-5501",
    specialization: "K-9 Unit",
  },
  {
    id: 402,
    name: "Officer Lisa Chang",
    badge: "BDG-5502",
    specialization: "Tactical Response",
  },
  {
    id: 403,
    name: "Officer John Smith",
    badge: "BDG-5503",
    specialization: "Negotiation",
  },
  {
    id: 404,
    name: "Officer Emma Wilson",
    badge: "BDG-5504",
    specialization: "Community Outreach",
  },
  {
    id: 405,
    name: "Officer Tyrone Jackson",
    badge: "BDG-5505",
    specialization: "Traffic Control",
  },
  {
    id: 406,
    name: "Officer Sophia Patel",
    badge: "BDG-5506",
    specialization: "Evidence Collection",
  },
];

// Main component
const IncidentTracker = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRedZoneModal, setShowRedZoneModal] = useState(false);
  const [selectedRedZone, setSelectedRedZone] = useState(null);
  const [showOffenderModal, setShowOffenderModal] = useState(false);
  const [selectedOffender, setSelectedOffender] = useState(null);
  const [showPatrolModal, setShowPatrolModal] = useState(false);
  const [selectedPatrol, setSelectedPatrol] = useState(null);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [selectedBackupOfficers, setSelectedBackupOfficers] = useState([]);
  const goBack = () => {
    window.history.back();
  };

  const openDetailModal = (incident) => {
    setSelectedIncident(incident);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const openRedZoneModal = (redZone) => {
    setSelectedRedZone(redZone);
    setShowRedZoneModal(true);
  };

  const closeRedZoneModal = () => {
    setShowRedZoneModal(false);
  };

  const openOffenderModal = (offender) => {
    setSelectedOffender(offender);
    setShowOffenderModal(true);
  };

  const closeOffenderModal = () => {
    setShowOffenderModal(false);
  };

  const openPatrolModal = (patrol) => {
    setSelectedPatrol(patrol);
    setShowPatrolModal(true);
  };

  const closePatrolModal = () => {
    setShowPatrolModal(false);
  };

  const openBackupModal = () => {
    setSelectedBackupOfficers([]);
    setShowBackupModal(true);
  };

  const closeBackupModal = () => {
    setShowBackupModal(false);
  };

  const toggleBackupOfficer = (officer) => {
    setSelectedBackupOfficers((prev) => {
      const isSelected = prev.find((o) => o.id === officer.id);
      if (isSelected) {
        return prev.filter((o) => o.id !== officer.id);
      } else {
        return [...prev, officer];
      }
    });
  };

  const requestBackup = () => {
    // In a real application, this would send a request to the backend
    alert(
      `Backup requested: ${selectedBackupOfficers
        .map((o) => o.name)
        .join(", ")}`
    );
    closeBackupModal();
  };

  return (
    <div className="incident-tracker-container">
      <button onClick={goBack} className="back-button">
        Back
      </button>
      <div className="header-section">
        <h1 className="main-title">
          <Shield size={32} className="icon-shield" />
          Area Safety Incident Tracker
        </h1>
        <div className="header-controls">
          <div className="date-display">
            <Calendar size={16} className="icon-calendar" />
            <span>Today: March 16, 2025</span>
          </div>
          <div className="action-buttons">
            <button className="btn-report">Report New Incident</button>
            <button className="btn-emergency">Emergency Line</button>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="incidents-section">
          <h2 className="section-title">Recent Incidents</h2>
          <div className="incident-cards">
            {incidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onReadMore={() => openDetailModal(incident)}
              />
            ))}
          </div>
        </div>

        <div className="red-zones-section">
          <h2 className="section-title">
            <AlertTriangle size={20} className="icon-alert" />
            High-Risk Areas
          </h2>
          <div className="red-zone-cards">
            {redZones.map((zone) => (
              <RedZoneCard
                key={zone.id}
                zone={zone}
                onViewDetails={() => openRedZoneModal(zone)}
                onViewOffender={(offender) => openOffenderModal(offender)}
              />
            ))}
          </div>
        </div>

        <div className="patrol-section">
          <h2 className="section-title">
            <Users size={20} className="icon-users" />
            Patrol Units
          </h2>
          <div className="patrol-cards">
            {patrolOfficers.map((patrol) => (
              <PatrolCard
                key={patrol.id}
                patrol={patrol}
                onViewDetails={() => openPatrolModal(patrol)}
              />
            ))}
          </div>
        </div>
      </div>
      {showDetailModal && selectedIncident && (
        <DetailModal incident={selectedIncident} onClose={closeDetailModal} />
      )}

      {showRedZoneModal && selectedRedZone && (
        <RedZoneModal
          redZone={selectedRedZone}
          onClose={closeRedZoneModal}
          onViewOffender={openOffenderModal}
        />
      )}

      {showOffenderModal && selectedOffender && (
        <OffenderModal
          offender={selectedOffender}
          onClose={closeOffenderModal}
        />
      )}

      {showPatrolModal && selectedPatrol && (
        <PatrolModal
          patrol={selectedPatrol}
          onClose={closePatrolModal}
          onRequestBackup={openBackupModal}
        />
      )}

      {showBackupModal && (
        <BackupModal
          availableOfficers={availableBackupOfficers}
          selectedOfficers={selectedBackupOfficers}
          onToggleOfficer={toggleBackupOfficer}
          onRequestBackup={requestBackup}
          onClose={closeBackupModal}
        />
      )}
    </div>
  );
};

// Incident Card Component (existing)
const IncidentCard = ({ incident, onReadMore }) => {
  return (
    <div className="incident-card">
      <div
        className={`incident-header ${
          incident.resolved ? "resolved" : "active"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="incident-title">{incident.issue}</h2>
          <span className="status-indicator">
            {incident.resolved ? (
              <Check size={18} className="icon-check" />
            ) : (
              <AlertCircle size={18} className="icon-alert" />
            )}
            {incident.resolved ? "Resolved" : "Active"}
          </span>
        </div>
      </div>

      <div className="incident-details">
        <div className="detail-item">
          <Calendar size={16} className="detail-icon" />
          <span>{incident.date}</span>
        </div>

        <div className="detail-item">
          <Clock size={16} className="detail-icon" />
          <span>{incident.time}</span>
        </div>

        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{incident.location}</span>
        </div>

        <div className="officer-info">
          <h3 className="officer-label">Responding Officer:</h3>
          <div className="officer-name">
            <User size={16} className="officer-icon" />
            <span>{incident.officer.name}</span>
          </div>
        </div>

        {incident.cctvAvailable && (
          <div className="cctv-badge">
            <span className="cctv-text">CCTV Available</span>
          </div>
        )}

        <button onClick={onReadMore} className="btn-read-more">
          Read Full Report
        </button>
      </div>
    </div>
  );
};

// Detail Modal Component (existing)
const DetailModal = ({ incident, onClose }) => {
  const [activeTab, setActiveTab] = useState("report");

  return (
    <div className="modal-overlay">
      <div className="modal-container detail-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{incident.issue}</h2>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="incident-meta">
            <div className="meta-item">
              <Calendar size={16} className="meta-icon" />
              <span>{incident.date}</span>
            </div>

            <div className="meta-item">
              <Clock size={16} className="meta-icon" />
              <span>{incident.time}</span>
            </div>

            <div className="meta-item">
              <MapPin size={16} className="meta-icon" />
              <span>{incident.location}</span>
            </div>

            <div
              className={`status-badge ${
                incident.resolved ? "resolved" : "active"
              }`}
            >
              {incident.resolved ? (
                <Check size={16} className="status-icon" />
              ) : (
                <AlertCircle size={16} className="status-icon" />
              )}
              {incident.resolved ? "Resolved" : "Active"}
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs-nav">
              <nav className="tabs-list">
                <button
                  onClick={() => setActiveTab("report")}
                  className={`tab ${activeTab === "report" ? "active" : ""}`}
                >
                  Detailed Report
                </button>
                <button
                  onClick={() => setActiveTab("officer")}
                  className={`tab ${activeTab === "officer" ? "active" : ""}`}
                >
                  Officer Statement
                </button>
                {incident.offenders.length > 0 && (
                  <button
                    onClick={() => setActiveTab("offenders")}
                    className={`tab ${
                      activeTab === "offenders" ? "active" : ""
                    }`}
                  >
                    Offender Details
                  </button>
                )}
                {incident.cctvAvailable && (
                  <button
                    onClick={() => setActiveTab("cctv")}
                    className={`tab ${activeTab === "cctv" ? "active" : ""}`}
                  >
                    CCTV Footage
                  </button>
                )}
              </nav>
            </div>

            <div className="tab-content">
              {activeTab === "report" && (
                <div className="report-content">
                  <p className="report-text">{incident.detailedReport}</p>
                </div>
              )}

              {activeTab === "officer" && (
                <div className="officer-content">
                  <div className="officer-info-section">
                    <h3 className="section-label">Officer Information</h3>
                    <p className="officer-data">
                      {incident.officer.name} (Badge: {incident.officer.badge})
                    </p>
                  </div>
                  <div className="statement-section">
                    <h3 className="section-label">Officer Statement</h3>
                    <p className="statement-text">
                      {incident.officer.statement}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "offenders" && (
                <div className="offenders-content">
                  {incident.offenders.map((offender, index) => (
                    <div key={index} className="offender-item">
                      <div className="offender-profile">
                        <div className="offender-image">
                          {offender.name !== "Unknown" ? (
                            <img
                              src="/api/placeholder/200/200"
                              alt={offender.name}
                              className="profile-img"
                            />
                          ) : (
                            <User size={32} className="unknown-icon" />
                          )}
                        </div>
                        <div className="offender-info">
                          <h3 className="offender-name">{offender.name}</h3>
                          {offender.age !== "Unknown" && (
                            <p className="offender-age">Age: {offender.age}</p>
                          )}
                          <div className="background-section">
                            <details className="background-details">
                              <summary className="background-summary">
                                <span>Background Information</span>
                                <ChevronDown
                                  size={16}
                                  className="chevron-icon"
                                />
                              </summary>
                              <div className="background-content">
                                <p className="prior-offenses">
                                  <strong>Prior Offenses:</strong>{" "}
                                  {offender.priorOffenses}
                                </p>
                                <p className="current-status">
                                  <strong>Current Status:</strong>{" "}
                                  {offender.currentStatus}
                                </p>
                              </div>
                            </details>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "cctv" && (
                <div className="cctv-content">
                  <div className="cctv-preview">
                    <div className="preview-placeholder">
                      <p className="placeholder-text">
                        CCTV footage preview placeholder
                      </p>
                      <button className="btn-request-access">
                        Request Access to Footage
                      </button>
                    </div>
                  </div>
                  <p className="access-note">
                    Note: Access to CCTV footage is restricted and requires
                    proper authorization.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Red Zone Card Component
const RedZoneCard = ({ zone, onViewDetails, onViewOffender }) => {
  return (
    <div className="red-zone-card">
      <div className={`zone-header threat-${zone.threatLevel.toLowerCase()}`}>
        <h2 className="zone-title">{zone.name}</h2>
        <span className="threat-badge">{zone.threatLevel} Threat</span>
      </div>

      <div className="zone-details">
        <div className="detail-item">
          <AlertTriangle size={16} className="detail-icon" />
          <span>{zone.recentIncidents} Recent Incidents</span>
        </div>

        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>Coordinates: {zone.coordinates}</span>
        </div>

        <div className="crime-types">
          <h3 className="section-label">Prevalent Crime Types:</h3>
          <div className="crime-tags">
            {zone.crimeTypes.map((crime, index) => (
              <span key={index} className="crime-tag">
                {crime}
              </span>
            ))}
          </div>
        </div>

        <div className="known-offenders">
          <h3 className="section-label">Known Offenders:</h3>
          <div className="offender-list">
            {zone.knownOffenders.map((offender) => (
              <div
                key={offender.id}
                className="offender-preview"
                onClick={() => onViewOffender(offender)}
              >
                <div className="offender-thumbnail">
                  <img
                    src="/api/placeholder/50/50"
                    alt={offender.name}
                    className="thumbnail-img"
                  />
                </div>
                <div className="offender-preview-info">
                  <p className="offender-preview-name">{offender.name}</p>
                  <span
                    className={`danger-level danger-${offender.dangerLevel.toLowerCase()}`}
                  >
                    {offender.dangerLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-view-zone" onClick={() => onViewDetails(zone)}>
          View Full Details
        </button>
      </div>
    </div>
  );
};

// New Red Zone Modal Component
const RedZoneModal = ({ redZone, onClose, onViewOffender }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="modal-overlay">
      <div className="modal-container red-zone-modal">
        <div className="modal-content">
          <div
            className={`modal-header threat-${redZone.threatLevel.toLowerCase()}`}
          >
            <h2 className="modal-title">{redZone.name}</h2>
            <div className="threat-indicator">
              <AlertTriangle size={20} className="threat-icon" />
              <span>{redZone.threatLevel} Threat Level</span>
            </div>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="tabs-container">
            <div className="tabs-nav">
              <button
                onClick={() => setActiveTab("overview")}
                className={`tab ${activeTab === "overview" ? "active" : ""}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("offenders")}
                className={`tab ${activeTab === "offenders" ? "active" : ""}`}
              >
                Known Offenders
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`tab ${activeTab === "map" ? "active" : ""}`}
              >
                Area Map
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="overview-content">
                  <div className="zone-description">
                    <h3 className="content-subtitle">Situation Report</h3>
                    <p className="description-text">{redZone.description}</p>
                  </div>

                  <div className="zone-stats">
                    <div className="stat-item">
                      <h4 className="stat-label">Recent Incidents</h4>
                      <p className="stat-value">{redZone.recentIncidents}</p>
                    </div>
                    <div className="stat-item">
                      <h4 className="stat-label">Known Offenders</h4>
                      <p className="stat-value">
                        {redZone.knownOffenders.length}
                      </p>
                    </div>
                    <div className="stat-item">
                      <h4 className="stat-label">Coordinates</h4>
                      <p className="stat-value">{redZone.coordinates}</p>
                    </div>
                  </div>

                  <div className="crime-analysis">
                    <h3 className="content-subtitle">Crime Analysis</h3>
                    <div className="crime-tags">
                      {redZone.crimeTypes.map((crime, index) => (
                        <span key={index} className="crime-tag-large">
                          {crime}
                        </span>
                      ))}
                    </div>
                    <div className="crime-chart">
                      <div className="chart-placeholder">
                        <p>Crime trend chart would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offenders" && (
                <div className="offenders-content">
                  <h3 className="content-subtitle">Known Criminal Offenders</h3>
                  <p className="content-description">
                    Individuals known to operate in this area
                  </p>

                  <div className="offenders-grid">
                    {redZone.knownOffenders.map((offender) => (
                      <div
                        key={offender.id}
                        className="offender-card"
                        onClick={() => onViewOffender(offender)}
                      >
                        <div className="offender-card-header">
                          <span
                            className={`danger-badge danger-${offender.dangerLevel.toLowerCase()}`}
                          >
                            {offender.dangerLevel}
                          </span>
                        </div>
                        <div className="offender-card-body">
                          <div className="offender-image-large">
                            <img
                              src="/api/placeholder/150/150"
                              alt={offender.name}
                            />
                          </div>
                          <div className="offender-card-info">
                            <h4 className="offender-name">{offender.name}</h4>
                            <p className="offender-age">Age: {offender.age}</p>
                            <p className="warrants-info">
                              Active Warrants: {offender.warrants}
                            </p>
                            <p className="last-seen">
                              Last Seen: {offender.lastSeen}
                            </p>
                            <p className="affiliation">
                              Affiliation: {offender.affiliations}
                            </p>
                          </div>
                        </div>
                        <div className="offender-card-footer">
                          <button className="btn-view-profile">
                            View Full Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "map" && (
                <div className="map-content">
                  <div className="map-container">
                    <div className="map-placeholder">
                      <p>Interactive area map would appear here</p>
                      <p>Coordinates: {redZone.coordinates}</p>
                    </div>
                  </div>
                  <div className="map-controls">
                    <button className="btn-patrol-routes">
                      Show Patrol Routes
                    </button>
                    <button className="btn-incident-markers">
                      Show Incident Markers
                    </button>
                    <button className="btn-print-map">Print Map</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Offender Modal Component
const OffenderModal = ({ offender, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container offender-modal">
        <div className="modal-content">
          <div
            className={`modal-header danger-${offender.dangerLevel.toLowerCase()}`}
          >
            <h2 className="modal-title">{offender.name}</h2>
            <span className="danger-level">
              Threat Level: {offender.dangerLevel}
            </span>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="offender-profile-container">
            <div className="offender-image-container">
              <img
                src="/api/placeholder/300/300"
                alt={offender.name}
                className="offender-image-full"
              />
              <span className="image-caption">Last known appearance</span>
            </div>

            <div className="offender-details">
              <div className="detail-row">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{offender.age}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Last Seen:</span>
                <span className="detail-value">{offender.lastSeen}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Active Warrants:</span>
                <span className="detail-value">{offender.warrants}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Affiliations:</span>
                <span className="detail-value">{offender.affiliations}</span>
              </div>

              <div className="description-box">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{offender.description}</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-record">View Complete Record</button>
            <button className="btn-alert">Set Encounter Alert</button>
            <button className="btn-print">Print Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Patrol Card Component
const PatrolCard = ({ patrol, onViewDetails }) => {
  return (
    <div className="patrol-card">
      <div className="patrol-header">
        <h2 className="patrol-title">
          {patrol.rank} {patrol.name}
        </h2>
        <span className="badge-number">Badge: {patrol.badge}</span>
      </div>

      <div className="patrol-details">
        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{patrol.area}</span>
        </div>

        <div className="detail-item">
          <Clock size={16} className="detail-icon" />
          <span>Shift: {patrol.shift}</span>
        </div>

        <div className="team-section">
          <h3 className="section-label">Team Size: {patrol.team.length}</h3>
          <div className="team-avatars">
            {patrol.team.map((officer, idx) => (
              <div
                key={idx}
                className="team-avatar-container"
                title={officer.name}
              >
                <div className="team-avatar">{officer.name.charAt(0)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="vehicle-info">
          <h3 className="section-label">Vehicle ID: {patrol.vehicleId}</h3>
        </div>

        <button
          className="btn-view-patrol"
          onClick={() => onViewDetails(patrol)}
        >
          View Patrol Details
        </button>
      </div>
    </div>
  );
};

// New Patrol Modal Component
const PatrolModal = ({ patrol, onClose, onRequestBackup }) => {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="modal-overlay">
      <div className="modal-container patrol-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {patrol.rank} {patrol.name}
            </h2>
            <span className="badge-number">Badge: {patrol.badge}</span>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="patrol-meta">
            <div className="meta-item">
              <Users size={16} className="meta-icon" />
              <span>{patrol.team.length} Officers</span>
            </div>

            <div className="meta-item">
              <MapPin size={16} className="meta-icon" />
              <span>{patrol.area}</span>
            </div>

            <div className="meta-item">
              <Radio size={16} className="meta-icon" />
              <span>Vehicle: {patrol.vehicleId}</span>
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs-nav">
              <button
                onClick={() => setActiveTab("team")}
                className={`tab ${activeTab === "team" ? "active" : ""}`}
              >
                Team Roster
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`tab ${activeTab === "location" ? "active" : ""}`}
              >
                Current Location
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`tab ${activeTab === "stats" ? "active" : ""}`}
              >
                Performance
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "team" && (
                <div className="team-content">
                  <div className="team-leader">
                    <div className="leader-avatar">
                      <img
                        src="/api/placeholder/100/100"
                        alt={patrol.name}
                        className="avatar-img"
                      />
                    </div>
                    <div className="leader-info">
                      <h3 className="leader-name">
                        {patrol.rank} {patrol.name}
                      </h3>
                      <p className="leader-badge">Badge: {patrol.badge}</p>
                      <p className="leader-service">
                        Years of Service: {patrol.yearsOfService}
                      </p>
                      <p className="leader-specialty">
                        Specialization: {patrol.specialization}
                      </p>
                    </div>
                  </div>

                  <h3 className="team-list-title">Team Members</h3>
                  <div className="team-list">
                    {patrol.team.map((officer) => (
                      <div key={officer.id} className="team-member">
                        <div className="member-avatar">
                          <img
                            src="/api/placeholder/50/50"
                            alt={officer.name}
                            className="avatar-small"
                          />
                        </div>
                        <div className="member-info">
                          <p className="member-name">{officer.name}</p>
                          <p className="member-badge">Badge: {officer.badge}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="team-controls">
                    <button
                      className="btn-request-backup"
                      onClick={onRequestBackup}
                    >
                      Request Backup
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "location" && (
                <div className="location-content">
                  <div className="map-placeholder">
                    <p>Live patrol location map would appear here</p>
                    <p>Currently patrolling: {patrol.area}</p>
                  </div>

                  <div className="location-stats">
                    <div className="stat-item">
                      <h4 className="stat-label">Current Status</h4>
                      <p className="stat-value">On Patrol</p>
                    </div>
                    <div className="stat-item">
                      <h4 className="stat-label">Last Check-in</h4>
                      <p className="stat-value">10 minutes ago</p>
                    </div>
                    <div className="stat-item">
                      <h4 className="stat-label">Patrol Route</h4>
                      <p className="stat-value">Route A-7</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div className="stats-content">
                  <div className="performance-metrics">
                    <h3 className="metrics-title">
                      Performance Metrics - Current Month
                    </h3>

                    <div className="metrics-grid">
                      <div className="metric-box">
                        <h4 className="metric-name">Response Time</h4>
                        <p className="metric-value">4.2 minutes</p>
                        <span className="trend-positive">
                          -0.5 from previous
                        </span>
                      </div>

                      <div className="metric-box">
                        <h4 className="metric-name">Incidents Handled</h4>
                        <p className="metric-value">27</p>
                        <span className="trend-positive">+3 from previous</span>
                      </div>

                      <div className="metric-box">
                        <h4 className="metric-name">Area Coverage</h4>
                        <p className="metric-value">93%</p>
                        <span className="trend-positive">
                          +5% from previous
                        </span>
                      </div>

                      <div className="metric-box">
                        <h4 className="metric-name">Community Feedback</h4>
                        <p className="metric-value">4.8/5.0</p>
                        <span className="trend-neutral">No change</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Backup Modal Component
const BackupModal = ({
  availableOfficers,
  selectedOfficers,
  onToggleOfficer,
  onRequestBackup,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container backup-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Request Backup</h2>
            <button onClick={onClose} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="backup-message">
            <p>Select officers to request as backup:</p>
          </div>

          <div className="officers-list">
            {availableOfficers.map((officer) => {
              const isSelected = selectedOfficers.some(
                (o) => o.id === officer.id
              );
              return (
                <div
                  key={officer.id}
                  className={`officer-item ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggleOfficer(officer)}
                >
                  <div className="officer-checkbox">
                    {isSelected && <Check size={16} className="check-icon" />}
                  </div>
                  <div className="officer-avatar">
                    <img
                      src="/api/placeholder/40/40"
                      alt={officer.name}
                      className="avatar-tiny"
                    />
                  </div>
                  <div className="officer-info">
                    <p className="officer-name">{officer.name}</p>
                    <p className="officer-badge">Badge: {officer.badge}</p>
                  </div>
                  <div className="officer-specialty">
                    <span className="specialty-tag">
                      {officer.specialization}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="modal-footer">
            <div className="selected-count">
              {selectedOfficers.length} officers selected
            </div>
            <div className="action-buttons">
              <button className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-request"
                onClick={onRequestBackup}
                disabled={selectedOfficers.length === 0}
              >
                Request Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentTracker;
