import React from "react";
import { Link } from "react-router-dom";

const Detection = () => {
  return (
    <div className="page-container">
      <header className="header">
        <h1>Threat Detection</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Dashboard
          </Link>
          <Link to="/detection" className="nav-link active">
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

      <div className="page-content">
        <h2>Threat Detection Configuration</h2>
        <div className="detection-settings">
          <div className="detection-card">
            <h3>Detection Parameters</h3>
            <div className="form-group">
              <label>Threat Sensitivity</label>
              <select className="form-control">
                <option>Low</option>
                <option>Medium</option>
                <option selected>High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Detection Radius (miles)</label>
              <input
                type="range"
                min="1"
                max="100"
                value="25"
                className="form-control"
              />
              <span>25 miles</span>
            </div>
            <div className="form-group">
              <label>Confidence Threshold</label>
              <input
                type="range"
                min="50"
                max="100"
                value="70"
                className="form-control"
              />
              <span>70%</span>
            </div>
            <button className="primary-button">Apply Settings</button>
          </div>

          <div className="detection-card">
            <h3>Data Sources</h3>
            <div className="data-source-list">
              <div className="data-source-item">
                <input type="checkbox" id="social-media" checked />
                <label htmlFor="social-media">Social Media Analytics</label>
              </div>
              <div className="data-source-item">
                <input type="checkbox" id="satellite" checked />
                <label htmlFor="satellite">Satellite Imagery</label>
              </div>
              <div className="data-source-item">
                <input type="checkbox" id="intelligence" checked />
                <label htmlFor="intelligence">Intelligence Reports</label>
              </div>
              <div className="data-source-item">
                <input type="checkbox" id="cctv" checked />
                <label htmlFor="cctv">CCTV Footage</label>
              </div>
              <div className="data-source-item">
                <input type="checkbox" id="traffic" />
                <label htmlFor="traffic">Traffic Cameras</label>
              </div>
              <div className="data-source-item">
                <input type="checkbox" id="emergency" />
                <label htmlFor="emergency">Emergency Calls</label>
              </div>
            </div>
            <button className="primary-button">Update Sources</button>
          </div>
        </div>

        <div className="detection-advanced">
          <h3>Advanced Settings</h3>
          <div className="form-group">
            <label>API Endpoint</label>
            <input
              type="text"
              className="form-control"
              value="https://api.threatdetection.com/v1"
            />
          </div>
          <div className="form-group">
            <label>Polling Interval (seconds)</label>
            <input type="number" className="form-control" value="30" min="5" />
          </div>
          <div className="form-group">
            <label>AI Model</label>
            <select className="form-control">
              <option>Standard</option>
              <option selected>Advanced</option>
              <option>Premium</option>
            </select>
          </div>
          <button className="primary-button">Save Advanced Settings</button>
        </div>
      </div>

      <footer className="footer">
        <p>AI-Driven Threat Prediction Engine (ATPE) &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Detection;
