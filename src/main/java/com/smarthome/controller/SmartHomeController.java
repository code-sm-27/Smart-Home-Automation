package com.smarthome.controller;

import org.springframework.web.bind.annotation.*;
import com.smarthome.model.*; // Adjust the package path as necessary

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Enable cross-origin requests from React
@RestController
@RequestMapping("/api")
public class SmartHomeController {

    private final List<SmartDevice> devices = new ArrayList<>();

    public SmartHomeController() {
        // Initialize devices
        devices.add(new SmartLight("LR-L1")); // Living Room Light 1
        devices.add(new SmartLight("LR-L2")); // Living Room Light 2
        devices.add(new SmartLight("BR-L1")); // Bedroom Light 1
        devices.add(new SmartLight("BR-L2")); // Bedroom Light 2
        devices.add(new SmartThermostat("T1")); // Thermostat 1
        devices.add(new SmartThermostat("T2")); // Thermostat 2
        devices.add(new SmartLight("KT-L1")); // Kitchen Light 1
        devices.add(new SmartLight("KT-L2")); // Kitchen Light 2
        devices.add(new SmartThermostat("T3")); // Thermostat 3
        devices.add(new SmartLight("GR-L1")); // Garage Light 1
        devices.add(new SmartPlug("P1")); // Smart Plug 1
        devices.add(new SmartPlug("P2")); // Smart Plug 2
        devices.add(new SecurityCamera("C1")); // Security Camera 1
        devices.add(new SecurityCamera("C2")); // Security Camera 2
        devices.add(new SmartSpeaker("S1")); // Smart Speaker 1
        devices.add(new SmartSpeaker("S2")); // Smart Speaker 2
    }

    @GetMapping("/devices")
    public List<String> getAllDevices() {
        // Log devices for debugging
        System.out.println("Devices: " + devices);

        List<String> statuses = new ArrayList<>();
        for (SmartDevice device : devices) {
            statuses.add(device.getStatus());
        }
        return statuses;
    }

    @PostMapping("/device/{id}/toggle")
    public String toggleDevice(@PathVariable String id) {
        SmartDevice device = findDevice(id);
        if (device != null) {
            if (device.isOn()) {
                device.turnOff();
            } else {
                device.turnOn();
            }
            return device.getStatus();
        }
        return "{\"error\":\"Device not found\"}";
    }

    @PostMapping("/light/{id}/brightness")
    public String setBrightness(@PathVariable String id, @RequestParam int brightness) {
        SmartDevice device = findDevice(id);
        if (device instanceof SmartLight) {
            ((SmartLight) device).setBrightness(brightness);
            return device.getStatus();
        }
        return "{\"error\":\"Invalid device type or not found\"}";
    }

    @PostMapping("/thermostat/{id}/temperature")
    public String setTemperature(@PathVariable String id, @RequestParam double temperature) {
        SmartDevice device = findDevice(id);
        if (device instanceof SmartThermostat) {
            ((SmartThermostat) device).setTemperature(temperature);
            return device.getStatus();
        }
        return "{\"error\":\"Invalid device type or not found\"}";
    }

    @PostMapping("/camera/{id}/recording")
    public String toggleRecording(@PathVariable String id) {
        SmartDevice device = findDevice(id);
        if (device instanceof SecurityCamera) {
            SecurityCamera camera = (SecurityCamera) device;
            if (camera.isOn()) {
                if (camera.isRecording()) {
                    camera.stopRecording();
                } else {
                    camera.startRecording();
                }
                return camera.getStatus();
            } else {
                return "{\"error\":\"Camera is off\"}";
            }
        }
        return "{\"error\":\"Invalid device type or not found\"}";
    }

    @PostMapping("/speaker/{id}/volume")
    public String setVolume(@PathVariable String id, @RequestParam int volume) {
        SmartDevice device = findDevice(id);
        if (device instanceof SmartSpeaker) {
            ((SmartSpeaker) device).setVolume(volume);
            return device.getStatus();
        }
        return "{\"error\":\"Invalid device type or not found\"}";
    }

    private SmartDevice findDevice(String id) {
        return devices.stream()
                .filter(device -> device.getDeviceId().equals(id))
                .findFirst()
                .orElse(null);
    }
}