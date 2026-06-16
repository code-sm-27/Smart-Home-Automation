package com.smarthome.controller;

import com.smarthome.model.Device;
import com.smarthome.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SmartHomeController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/devices")
    public ResponseEntity<List<Device>> getAllDevices() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    @PostMapping("/device/{id}/toggle")
    public ResponseEntity<?> toggleDevice(@PathVariable String id) {
        String username = getCurrentUsername();
        Device device = deviceService.toggleDevice(id, username);
        if (device != null) {
            return ResponseEntity.ok(device);
        }
        return ResponseEntity.badRequest().body("Device not found");
    }

    @PostMapping("/device/{id}/settings")
    public ResponseEntity<?> updateDeviceSettings(@PathVariable String id, @RequestBody Device updatedSettings) {
        String username = getCurrentUsername();
        Device device = deviceService.getDevice(id);
        if (device != null) {
            if (updatedSettings.getBrightness() != null) device.setBrightness(updatedSettings.getBrightness());
            if (updatedSettings.getTemperature() != null) device.setTemperature(updatedSettings.getTemperature());
            if (updatedSettings.getVolume() != null) device.setVolume(updatedSettings.getVolume());
            if (updatedSettings.getRecording() != null) device.setRecording(updatedSettings.getRecording());
            
            deviceService.saveDevice(device);
            deviceService.broadcastDeviceState(device);
            deviceService.logEvent(id, "Updated settings", username);
            
            return ResponseEntity.ok(device);
        }
        return ResponseEntity.badRequest().body("Device not found");
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return "System";
    }
}