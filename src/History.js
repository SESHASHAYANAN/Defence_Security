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
} from "lucide-react";
import "./Record.css";

// Sample data remains the same
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
  {
    id: 4,
    date: "2025-03-13",
    time: "17:20",
    location: "Downtown Shopping Mall",
    issue: "Shoplifting",
    resolved: true,
    officer: {
      name: "Officer Emily Patel",
      badge: "BDG-5164",
      statement:
        "Responded to a shoplifting call at Downtown Shopping Mall. Security had detained a teenage suspect who attempted to leave with unpaid merchandise. Parents were contacted and agreed to pay for damages. Store manager declined to press charges given the suspect's age.",
    },
    offenders: [
      {
        name: "Minor (identity protected)",
        age: 16,
        priorOffenses: "None",
        currentStatus: "Released to parents' custody with warning",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 17:20, mall security contacted police regarding a shoplifting incident at 'Fashion Forward' store. Officer Patel responded and found security had detained a 16-year-old suspect who attempted to exit the store with approximately $85 worth of concealed merchandise. The store's CCTV system recorded the incident clearly. The teenager admitted to the theft and expressed remorse. Parents were contacted and arrived at 18:05. After discussion with the store manager, it was agreed that the parents would pay for the merchandise and any associated fees. Given this was a first offense and the suspect's minor status, the store declined to press charges. The teenager received counseling on the consequences of theft and was released to parental custody at 18:45.",
  },
  {
    id: 5,
    date: "2025-03-12",
    time: "21:35",
    location: "Riverview Bar & Grill",
    issue: "Assault",
    resolved: true,
    officer: {
      name: "Officer James Wilson",
      badge: "BDG-2975",
      statement:
        "Responded to a report of an altercation at Riverview Bar & Grill. Upon arrival, found two patrons engaged in a physical confrontation. Separated the individuals and took statements from witnesses. One individual was arrested for assault while the other was transported to Memorial Hospital for treatment of minor injuries.",
    },
    offenders: [
      {
        name: "Robert Smith",
        age: 34,
        priorOffenses: "One prior arrest for public intoxication",
        currentStatus: "Charged with assault, court date pending",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 21:35, dispatch received multiple calls regarding a fight at Riverview Bar & Grill. Officer Wilson and Officer Brooks responded and arrived at 21:42. They found two male patrons involved in a physical altercation which had been partially separated by staff. Investigation determined that Robert Smith (34) had initiated the confrontation after a dispute over a pool game. The victim, Thomas Jenkins (29), sustained a facial laceration and bruised ribs. Witness statements and bar surveillance footage confirmed Smith as the aggressor. Jenkins was transported to Memorial Hospital for treatment. Smith was arrested for assault and transported to the station for booking. BAC testing showed Smith was over the legal limit at 0.11%. The bar's management has been cooperative and provided the CCTV footage for evidence.",
  },
  {
    id: 6,
    date: "2025-03-15",
    time: "10:15",
    location: "City Bank, Downtown Branch",
    issue: "Attempted fraud",
    resolved: true,
    officer: {
      name: "Officer Karen Martinez",
      badge: "BDG-3847",
      statement:
        "Responded to a call from City Bank regarding attempted check fraud. Bank staff had detained a suspect attempting to cash a forged check. Upon arrival, confirmed the check was fraudulent and arrested the suspect. Bank will press charges.",
    },
    offenders: [
      {
        name: "Lisa Thompson",
        age: 41,
        priorOffenses: "Multiple fraud-related charges in neighboring counties",
        currentStatus: "In custody, arraignment scheduled",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 10:15, City Bank's downtown branch reported a suspected check fraud in progress. Officer Martinez responded and arrived at 10:23. Bank staff had detained Lisa Thompson (41) who was attempting to cash a check for $3,785 that raised suspicion with the teller. Investigation confirmed the check was forged, with the account holder later verifying they did not issue the check. Thompson was found to be carrying multiple forms of false identification and had a history of similar offenses in neighboring counties. She was arrested for check fraud and possession of fraudulent identification. The bank's security footage clearly captured the transaction attempt. Evidence was collected including the forged check and false IDs. Thompson was transported to the station for booking and is awaiting arraignment.",
  },
  {
    id: 7,
    date: "2025-03-14",
    time: "15:50",
    location: "Highway 101, Mile Marker 35",
    issue: "Traffic accident",
    resolved: true,
    officer: {
      name: "Officer Thomas Grant",
      badge: "BDG-6129",
      statement:
        "Responded to a multi-vehicle collision on Highway 101. Three vehicles involved, one driver showed signs of intoxication. Two individuals transported to hospital with non-life-threatening injuries. Conducted field sobriety test on suspected driver which showed impairment. Driver was arrested for DUI.",
    },
    offenders: [
      {
        name: "Victor Reynolds",
        age: 38,
        priorOffenses: "None",
        currentStatus:
          "Released on bail, license suspended pending court hearing",
      },
    ],
    cctvAvailable: false,
    detailedReport:
      "At 15:50, emergency services received multiple calls about a three-vehicle collision on Highway 101 near mile marker 35. Officer Grant and two additional units responded along with fire and ambulance services. Investigation determined that a vehicle driven by Victor Reynolds (38) rear-ended another vehicle at high speed, causing it to collide with a third vehicle. Reynolds showed signs of intoxication including slurred speech and impaired coordination. Field sobriety testing indicated impairment, and subsequent breathalyzer testing showed a BAC of 0.14%. Two occupants from the second vehicle were transported to County General Hospital with non-life-threatening injuries. Reynolds was arrested for DUI and transported for booking after being medically cleared. Highway traffic was redirected for approximately 90 minutes while the scene was cleared. Vehicle damage and skid mark analysis support witness statements that Reynolds' vehicle was traveling well above the speed limit prior to impact.",
  },
  {
    id: 8,
    date: "2025-03-11",
    time: "03:25",
    location: "Quick Stop Convenience Store",
    issue: "Armed robbery",
    resolved: false,
    officer: {
      name: "Officer Brian Miller",
      badge: "BDG-8342",
      statement:
        "Responded to a silent alarm at Quick Stop Convenience Store. Upon arrival, the suspect had fled the scene. Store clerk reported that a masked individual entered the store with a handgun and demanded cash from the register. Approximately $420 was taken. Investigation is ongoing.",
    },
    offenders: [
      {
        name: "Unknown",
        age: "Unknown (estimated 20-30)",
        priorOffenses: "Unknown",
        currentStatus: "At large, investigation ongoing",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 03:25, a silent alarm was triggered at Quick Stop Convenience Store. Officer Miller and Officer Diaz responded and arrived at 03:32. The suspect had already fled the scene. The store clerk, Sam Wilson, reported that a masked individual approximately 5'10\" entered the store, brandished what appeared to be a semi-automatic handgun, and demanded cash from the register. The suspect was described as wearing dark clothing, gloves, and a black ski mask. The clerk complied and the suspect fled on foot with approximately $420 in cash. Store surveillance captured the incident, though the suspect's face was concealed. Forensic team processed the scene for fingerprints and other evidence. The investigation is active with officers canvassing the area for additional witnesses or surveillance footage from neighboring businesses. The clerk was not physically harmed but has been offered counseling services.",
  },
  {
    id: 9,
    date: "2025-03-16",
    time: "11:05",
    location: "City Park",
    issue: "Drug activity",
    resolved: true,
    officer: {
      name: "Officer Natalie Wong",
      badge: "BDG-5518",
      statement:
        "Observed suspicious activity during routine patrol of City Park. Approached two individuals engaging in what appeared to be a drug transaction. Upon investigation, found one individual in possession of controlled substances intended for sale. Second individual was found with a small amount for personal use.",
    },
    offenders: [
      {
        name: "Daniel Garcia",
        age: 27,
        priorOffenses: "Two prior drug possession charges",
        currentStatus:
          "In custody, charged with possession with intent to distribute",
      },
      {
        name: "Kevin Williams",
        age: 23,
        priorOffenses: "None",
        currentStatus: "Released with citation for possession",
      },
    ],
    cctvAvailable: false,
    detailedReport:
      "At 11:05, during a routine patrol of City Park, Officer Wong observed what appeared to be a drug transaction taking place near the southwest playground. Upon approaching, both individuals attempted to conceal items. Investigation revealed Daniel Garcia (27) had approximately 45 grams of methamphetamine divided into small baggies, along with a digital scale and $635 in cash. Kevin Williams (23) was found with a single gram of the same substance. Both individuals were detained. Garcia has prior arrests for drug-related offenses and was taken into custody, charged with possession with intent to distribute. Williams had no prior record and was issued a citation for possession of a controlled substance. Evidence was photographed and collected according to protocol. The area is not covered by the park's CCTV system, but Officer Wong's body camera captured the interaction and search.",
  },
  {
    id: 10,
    date: "2025-03-15",
    time: "19:40",
    location: "Westside Neighborhood",
    issue: "Noise complaint",
    resolved: true,
    officer: {
      name: "Officer Patrick O'Neil",
      badge: "BDG-4091",
      statement:
        "Responded to multiple noise complaints about a house party. Upon arrival, music was clearly audible from the street. Homeowner was cooperative and agreed to lower the volume. Provided warning about noise ordinance violations. No further action required.",
    },
    offenders: [],
    cctvAvailable: false,
    detailedReport:
      "At 19:40, dispatch received the third noise complaint of the evening regarding a residence at 4275 Maple Street in the Westside Neighborhood. Officer O'Neil responded and arrived at 19:52. Music from the property was audible from approximately half a block away, exceeding permitted noise levels after 19:00. The homeowner, Christopher Lee, was contacted and informed about the noise ordinance violations. Lee was cooperative and stated he was hosting a birthday celebration and was unaware of the multiple complaints. He immediately lowered the music volume and agreed to move guests inside. Officer O'Neil provided a verbal warning and explained that continued complaints would result in a citation. A follow-up patrol at 21:15 confirmed compliance with the noise ordinance. No further complaints were received for the remainder of the evening.",
  },
  {
    id: 11,
    date: "2025-03-12",
    time: "13:10",
    location: "Elmwood Elementary School",
    issue: "Suspicious person",
    resolved: true,
    officer: {
      name: "Officer Rachel Simmons",
      badge: "BDG-7256",
      statement:
        "Responded to a call from Elmwood Elementary regarding an unknown individual loitering near the playground. Located the individual who claimed to be waiting for his nephew. Verified identity and confirmed with school staff that the individual was indeed on the approved pickup list for a student.",
    },
    offenders: [],
    cctvAvailable: true,
    detailedReport:
      "At 13:10, Elmwood Elementary School reported a suspicious individual loitering near the playground fence during recess. Officer Simmons responded and arrived at 13:18. The individual was identified as Marcus Taylor (42) who stated he was early to pick up his nephew. School security had already approached Taylor and requested he wait in the designated pickup area rather than near the playground. Officer Simmons verified Taylor's identification and confirmed with school administration that he was on the approved pickup list for third-grader Jason Taylor. School protocol was reviewed with Mr. Taylor who acknowledged the security concerns and apologized for the misunderstanding. No further action was required, and the school principal indicated satisfaction with the resolution. School surveillance cameras recorded the initial contact with security and subsequent police verification.",
  },
  {
    id: 12,
    date: "2025-03-13",
    time: "09:50",
    location: "Greenview Retirement Home",
    issue: "Missing person",
    resolved: true,
    officer: {
      name: "Officer Samuel Jackson",
      badge: "BDG-3912",
      statement:
        "Responded to a missing person report at Greenview Retirement Home. Staff reported that resident Harold Cooper (82) was not in his room and had missed his morning medication. Coordinated search of the facility and surrounding area. Located Mr. Cooper at the nearby public library where he had walked to browse books, forgetting to inform staff.",
    },
    offenders: [],
    cctvAvailable: true,
    detailedReport:
      "At 09:50, Greenview Retirement Home reported resident Harold Cooper (82) as missing. Mr. Cooper, who has early-stage dementia, was last seen at breakfast at 08:00 and was not in his room for scheduled medication at 09:30. Officer Jackson arrived at 10:05 and coordinated a search team consisting of facility staff and two additional officers. Mr. Cooper's room showed no signs of disturbance, and his walker was missing, suggesting he had left voluntarily. A review of facility security footage showed Mr. Cooper exiting through the main entrance at 08:45. After searching the immediate grounds, the search was expanded to nearby locations that Mr. Cooper was known to frequent. At 10:48, Mr. Cooper was located at the public library two blocks from the facility. He was in good health and stated he had walked to browse books as he had done weekly before becoming a resident. He had forgotten to inform staff of his plans. Mr. Cooper was returned to the facility, and staff implemented additional check-in procedures for residents with permission to leave the grounds.",
  },
  {
    id: 13,
    date: "2025-03-16",
    time: "16:15",
    location: "Fourth National Bank",
    issue: "Suspicious package",
    resolved: true,
    officer: {
      name: "Officer Alexandra Cooper",
      badge: "BDG-6284",
      statement:
        "Responded to Fourth National Bank regarding a suspicious unattended package in the lobby. Evacuated the premises and established a security perimeter. Bomb squad was called in and determined the package was an abandoned laptop bag containing personal items. Owner was identified through contents and contacted.",
    },
    offenders: [],
    cctvAvailable: true,
    detailedReport:
      "At 16:15, Fourth National Bank reported a suspicious package left unattended in the main lobby for over 30 minutes. Officer Cooper responded and arrived at 16:22. The package was a black laptop bag placed under a chair in the waiting area. Following protocol, the bank was evacuated and a 100-foot security perimeter was established. Traffic was diverted from the adjacent street. The bomb squad arrived at 16:45 and conducted an assessment including X-ray scanning of the package. At 17:10, the package was declared safe and found to contain a laptop, business documents, and personal items including a wallet with identification belonging to Aaron Mitchell, who had been in the bank earlier. Review of security footage showed Mitchell leaving the bank at 15:40, inadvertently leaving his bag behind. Mitchell was contacted and returned to retrieve his property at 17:40. The bank reopened for business at 17:25. No malicious intent was identified, and no charges were filed.",
  },
  {
    id: 14,
    date: "2025-03-14",
    time: "00:20",
    location: "Sunset Boulevard & Ocean Drive",
    issue: "Reckless driving",
    resolved: true,
    officer: {
      name: "Officer Justin Price",
      badge: "BDG-5791",
      statement:
        "Observed vehicle traveling at high speed and making dangerous lane changes on Sunset Boulevard. Initiated traffic stop. Driver exhibited signs of intoxication and failed field sobriety tests. Vehicle search incident to arrest revealed open alcohol containers.",
    },
    offenders: [
      {
        name: "Eric Ramirez",
        age: 25,
        priorOffenses: "One prior speeding ticket",
        currentStatus:
          "Released on bail, license suspended pending court hearing",
      },
    ],
    cctvAvailable: false,
    detailedReport:
      "At 00:20, Officer Price observed a silver Honda Accord traveling at approximately 65 mph in a 35 mph zone on Sunset Boulevard. The vehicle was making erratic lane changes without signaling and nearly collided with two other vehicles. Officer Price initiated a traffic stop near the intersection with Ocean Drive. The driver, identified as Eric Ramirez (25), exhibited slurred speech, bloodshot eyes, and the odor of alcohol. Field sobriety tests indicated impairment, and a preliminary breath test showed a BAC of 0.16%. A search of the vehicle incident to arrest revealed two open beer containers. Ramirez was arrested for DUI, reckless driving, and open container violations. The vehicle was impounded, and Ramirez was transported to the station for booking. His license was suspended pending court proceedings. Traffic cameras at the intersection may have captured the initial driving behavior, and Officer Price's dash camera recorded the traffic stop and field sobriety testing.",
  },
  {
    id: 15,
    date: "2025-03-15",
    time: "22:05",
    location: "East Side Community Center",
    issue: "Property damage",
    resolved: true,
    officer: {
      name: "Officer William Peters",
      badge: "BDG-4173",
      statement:
        "Responded to reports of property damage at East Side Community Center. Found broken windows and graffiti on the north side of the building. No suspects present at the scene. Collected evidence including photographs and paint samples. Center director will review security footage in the morning.",
    },
    offenders: [
      {
        name: "Unknown",
        age: "Unknown",
        priorOffenses: "Unknown",
        currentStatus: "Investigation ongoing",
      },
    ],
    cctvAvailable: true,
    detailedReport:
      "At 22:05, a passerby reported vandalism at the East Side Community Center. Officer Peters responded and arrived at 22:17. The north side of the building had three broken windows and graffiti tags covering approximately 20 square feet of wall space. The damage appeared recent, with evidence suggesting it occurred within the last 1-2 hours. Photos were taken of all damage and evidence, including distinctive graffiti tags that match recent vandalism in neighboring areas. Paint samples were collected for comparison. The center was secured to prevent further damage or unauthorized entry. The community center director was contacted and will review security footage in the morning as the system can only be accessed on-site. Damage is estimated at $1,200-1,500 for repairs. This incident marks the third case of vandalism at community properties this month. Officer Peters filed a request to increase patrols in the area. Follow-up is scheduled for the morning to review security footage with the center director.",
  },
];
const ArmyIncidentTracker = () => {
  // States
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const goBack = () => {
    window.history.back();
  };

  // Filter incidents based on status and search term
  const filteredIncidents = incidents.filter((incident) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !incident.resolved) ||
      (filterStatus === "resolved" && incident.resolved);

    const matchesSearch =
      incident.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.officer.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const openDetailModal = (incident) => {
    setSelectedIncident(incident);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="main-background">
      <div className="container">
        <button onClick={goBack} className="back-button">
          Back
        </button>
        <div className="header-wrapper">
          <h1 className="header-text">U.S. ARMY SECURITY OPERATIONS</h1>
          <div className="header-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="US Army Logo"
            >
              <path d="M28 0L56 28L28 56L0 28L28 0Z" fill="#000" />
              <path
                d="M28 5.25L5.25 28L28 50.75L50.75 28L28 5.25ZM28 9.8L9.8 28L28 46.2L46.2 28L28 9.8Z"
                fill="#FFC425"
              />
              <path
                d="M28 17.15L17.15 28L28 38.85L38.85 28L28 17.15Z"
                fill="#FFC425"
              />
              <path d="M28 22.4L22.4 28L28 33.6L33.6 28L28 22.4Z" fill="#000" />
            </svg>
            <span className="logo-text">INCIDENT TRACKER</span>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="filter-container">
          <div className="filter-row">
            <div className="filter-group">
              <span className="filter-label">Filter Status:</span>
              <div className="filter-buttons">
                <button
                  className={`filter-button filter-button-all ${
                    filterStatus === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </button>
                <button
                  className={`filter-button filter-button-active ${
                    filterStatus === "active" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("active")}
                >
                  Active
                </button>
                <button
                  className={`filter-button filter-button-resolved ${
                    filterStatus === "resolved" ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus("resolved")}
                >
                  Resolved
                </button>
              </div>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Display count of incidents */}
        <div className="count-display">
          Displaying {filteredIncidents.length} incident
          {filteredIncidents.length !== 1 ? "s" : ""}
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onReadMore={() => openDetailModal(incident)}
              />
            ))
          ) : (
            <div className="empty-state">
              <AlertCircle size={48} className="empty-icon" />
              <h3 className="empty-title">No Incidents Found</h3>
              <p className="empty-message">
                No incidents match your current search criteria. Try adjusting
                your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedIncident && (
        <DetailModal incident={selectedIncident} onClose={closeDetailModal} />
      )}
    </div>
  );
};

// Incident Card Component
const IncidentCard = ({ incident, onReadMore }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={
          incident.resolved ? "card-header-resolved" : "card-header-active"
        }
      >
        <div className="card-header-inner">
          <h2 className="card-title">{incident.issue}</h2>
          <span
            className={
              incident.resolved
                ? "card-status status-resolved"
                : "card-status status-active"
            }
          >
            {incident.resolved ? (
              <Check size={16} className="status-icon" />
            ) : (
              <AlertCircle size={16} className="status-icon" />
            )}
            {incident.resolved ? "Resolved" : "Active"}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-info-row">
          <Calendar size={16} className="card-info-icon" />
          <span>{incident.date}</span>
        </div>

        <div className="card-info-row">
          <Clock size={16} className="card-info-icon" />
          <span>{incident.time}</span>
        </div>

        <div className="card-info-row">
          <MapPin size={16} className="card-info-icon" />
          <span>{incident.location}</span>
        </div>

        <div className="card-section">
          <h3 className="card-section-title">Responding Officer:</h3>
          <div className="card-info-row">
            <User size={16} className="card-info-icon" />
            <span>{incident.officer.name}</span>
          </div>
        </div>

        {incident.cctvAvailable && (
          <div className="card-tag">
            <span>CCTV Available</span>
          </div>
        )}

        <button
          className={`btn-primary ${isHovered ? "animate-pulse" : ""}`}
          onClick={onReadMore}
        >
          <span>View Full Report</span>
          {isHovered && <ChevronDown size={16} className="btn-icon" />}
        </button>
      </div>
    </div>
  );
};

// Detail Modal Component
const DetailModal = ({ incident, onClose }) => {
  const [activeTab, setActiveTab] = useState("report");

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {incident.issue}
            {incident.resolved ? (
              <span className="modal-status-badge status-badge-resolved">
                Resolved
              </span>
            ) : (
              <span className="modal-status-badge status-badge-active">
                Active
              </span>
            )}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-info-bar">
            <div className="modal-info-item">
              <Calendar size={16} className="card-info-icon" />
              <span>{incident.date}</span>
            </div>

            <div className="modal-info-item">
              <Clock size={16} className="card-info-icon" />
              <span>{incident.time}</span>
            </div>

            <div className="modal-info-item">
              <MapPin size={16} className="card-info-icon" />
              <span>{incident.location}</span>
            </div>
          </div>

          <div>
            <div className="tabs-container">
              <nav className="tabs-nav">
                <button
                  className={`tab ${
                    activeTab === "report" ? "tab-active" : "tab-inactive"
                  }`}
                  onClick={() => setActiveTab("report")}
                >
                  Detailed Report
                </button>
                <button
                  className={`tab ${
                    activeTab === "officer" ? "tab-active" : "tab-inactive"
                  }`}
                  onClick={() => setActiveTab("officer")}
                >
                  Officer Statement
                </button>
                {incident.offenders && incident.offenders.length > 0 && (
                  <button
                    className={`tab ${
                      activeTab === "offenders" ? "tab-active" : "tab-inactive"
                    }`}
                    onClick={() => setActiveTab("offenders")}
                  >
                    Offender Details
                  </button>
                )}
                {incident.cctvAvailable && (
                  <button
                    className={`tab ${
                      activeTab === "cctv" ? "tab-active" : "tab-inactive"
                    }`}
                    onClick={() => setActiveTab("cctv")}
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
                <div className="officer-info">
                  <div className="officer-header">
                    <h3 className="officer-title">Officer Information</h3>
                    <div className="officer-details">
                      <div className="officer-avatar">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="officer-name">{incident.officer.name}</p>
                        <p className="officer-badge">
                          Badge: {incident.officer.badge}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="statement-container">
                    <h3 className="officer-title">Officer Statement</h3>
                    <div>
                      <p className="statement-text">
                        {incident.officer.statement}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offenders" && (
                <div>
                  {incident.offenders &&
                    incident.offenders.map((offender, index) => (
                      <div key={index} className="offender-card">
                        <div className="offender-details">
                          <div className="offender-image">
                            {offender.name !== "Unknown" ? (
                              <img
                                src="/api/placeholder/200/200"
                                alt={offender.name}
                              />
                            ) : (
                              <User size={32} />
                            )}
                          </div>
                          <div className="offender-info">
                            <h3 className="offender-name">{offender.name}</h3>
                            {offender.age !== "Unknown" && (
                              <p className="offender-age">
                                Age: {offender.age}
                              </p>
                            )}
                            <div className="offender-background">
                              <details>
                                <summary className="background-summary">
                                  <span>Background Information</span>
                                  <ChevronDown
                                    size={16}
                                    className="background-icon"
                                  />
                                </summary>
                                <div className="background-content">
                                  <p className="background-item">
                                    <strong>Prior Offenses:</strong>{" "}
                                    {offender.priorOffenses}
                                  </p>
                                  <p className="background-item">
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
                <div>
                  <div className="cctv-preview">
                    <div className="cctv-content">
                      <div className="cctv-badge">CLASSIFIED FOOTAGE</div>
                      <p className="cctv-message">
                        Access to this CCTV footage requires proper
                        authorization
                      </p>
                      <button className="btn-secondary">Request Access</button>
                    </div>
                  </div>
                  <div className="cctv-warning">
                    <AlertCircle size={16} className="warning-icon" />
                    <p>
                      Note: CCTV footage is restricted and requires proper
                      security clearance and authorization from a commanding
                      officer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Close Report
            </button>
            {!incident.resolved && (
              <button className="btn-danger">Mark as Resolved</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyIncidentTracker;
