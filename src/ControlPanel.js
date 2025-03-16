import React, { useState } from "react";

function ControlPanel({
  onDetectThreats,
  onClearThreats,
  loading,
  dataSources,
  onUpdateDataSource,
  pollingInterval,
  onUpdatePollingInterval,
}) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    onUpdatePollingInterval(value);
  };

  const handleDataSourceToggle = (source) => {
    onUpdateDataSource(source, !dataSources[source].active);
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>

      <div className="control-buttons">
        <button
          className="primary-button"
          onClick={onDetectThreats}
          disabled={loading}
        >
          {loading ? "Detecting..." : "Detect Threats Now"}
        </button>
        <button className="secondary-button" onClick={onClearThreats}>
          Clear All Threats
        </button>
      </div>

      <div className="data-sources">
        <h3>Data Sources</h3>
        <div className="data-source-list">
          {Object.entries(dataSources).map(([key, source]) => (
            <div key={key} className="data-source-item">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={source.active}
                  onChange={() => handleDataSourceToggle(key)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="data-source-name">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="advanced-settings">
        <button
          className="advanced-toggle"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          {isAdvancedOpen ? "Hide Advanced Settings" : "Show Advanced Settings"}
        </button>

        {isAdvancedOpen && (
          <div className="advanced-options">
            <div className="polling-interval">
              <label htmlFor="polling-interval">Polling Interval (ms):</label>
              <select
                id="polling-interval"
                value={pollingInterval}
                onChange={handleIntervalChange}
              >
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds</option>
                <option value={60000}>1 minute</option>
                <option value={300000}>5 minutes</option>
              </select>
            </div>

            <div className="ai-settings">
              <h4>AI Model Settings</h4>
              <div className="ai-model-option">
                <label>
                  <input
                    type="radio"
                    name="ai-model"
                    value="standard"
                    defaultChecked
                  />
                  Standard Analysis
                </label>
              </div>
              <div className="ai-model-option">
                <label>
                  <input type="radio" name="ai-model" value="enhanced" />
                  Enhanced Analysis (Groq)
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;
