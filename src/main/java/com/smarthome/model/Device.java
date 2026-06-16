package com.smarthome.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @Column(name = "device_id")
    private String deviceId;

    private String type; // "light", "thermostat", "camera", "plug", "speaker"
    
    private String name; // e.g. "Living Room Light 1"

    @Column(name = "is_on")
    private boolean isOn;

    // Type-specific attributes
    private Integer brightness;
    private Double temperature;
    private Integer volume;
    @Column(name = "is_recording")
    private Boolean isRecording;

    public Device() {
    }

    public Device(String deviceId, String type, String name) {
        this.deviceId = deviceId;
        this.type = type;
        this.name = name;
        this.isOn = false;
        
        switch (type) {
            case "light":
                this.brightness = 50;
                break;
            case "thermostat":
                this.temperature = 20.0;
                break;
            case "speaker":
                this.volume = 50;
                break;
            case "camera":
                this.isRecording = false;
                break;
        }
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isOn() {
        return isOn;
    }

    public void setOn(boolean on) {
        isOn = on;
    }

    public Integer getBrightness() {
        return brightness;
    }

    public void setBrightness(Integer brightness) {
        this.brightness = brightness;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public Boolean getRecording() {
        return isRecording;
    }

    public void setRecording(Boolean recording) {
        isRecording = recording;
    }
}
