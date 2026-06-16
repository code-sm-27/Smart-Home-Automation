package com.smarthome.service;

import com.smarthome.model.Device;
import com.smarthome.model.EventLog;
import com.smarthome.repository.DeviceRepository;
import com.smarthome.repository.EventLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private EventLogRepository eventLogRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Device getDevice(String id) {
        return deviceRepository.findById(id).orElse(null);
    }

    public Device saveDevice(Device device) {
        return deviceRepository.save(device);
    }

    public void broadcastDeviceState(Device device) {
        messagingTemplate.convertAndSend("/topic/devices", device);
    }

    public void logEvent(String deviceId, String action, String username) {
        EventLog log = new EventLog(deviceId, action, username, LocalDateTime.now());
        eventLogRepository.save(log);
    }

    // Toggle logic
    public Device toggleDevice(String id, String username) {
        Device device = getDevice(id);
        if (device != null) {
            device.setOn(!device.isOn());
            deviceRepository.save(device);
            broadcastDeviceState(device);
            logEvent(id, device.isOn() ? "Turned ON" : "Turned OFF", username);
        }
        return device;
    }
}
