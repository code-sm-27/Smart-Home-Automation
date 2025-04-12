import React from 'react';
import './DeviceCard.css';

function DeviceCard({ device, onToggle, onSetBrightness, onSetTemperature }) {
  return (
    <div className="device-card">
      <h3>{device.deviceId}</h3>
      <p>Status: {device.isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => onToggle(device.deviceId)}>
        {device.isOn ? 'Turn Off' : 'Turn On'}
      </button>
      {device.type === 'light' && (
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.brightness}
            onChange={(e) => onSetBrightness(device.deviceId, e.target.value)}
          />
          <span>Brightness: {device.brightness}%</span>
        </div>
      )}
      {device.type === 'thermostat' && (
        <div>
          <input
            type="number"
            step="0.1"
            value={device.temperature}
            onChange={(e) => onSetTemperature(device.deviceId, e.target.value)}
          />
          <span>Temperature: {device.temperature}°C</span>
        </div>
      )}
    </div>
  );
}

export default DeviceCard;
