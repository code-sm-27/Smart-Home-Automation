package com.smarthome.model;

public class SmartThermostat implements SmartDevice {
    private String deviceId;
    private boolean isOn;
    private double temperature;

    public SmartThermostat(String deviceId) {
        this.deviceId = deviceId;
        this.isOn = false;
        this.temperature = 20.0; // Default temperature
    }

    @Override
    public void turnOn() {
        this.isOn = true;
    }

    @Override
    public void turnOff() {
        this.isOn = false;
    }

    @Override
    public boolean isOn() {
        return isOn;
    }

    @Override
    public String getDeviceId() {
        return deviceId;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    @Override
    public String getStatus() {
        return String.format("{\"deviceId\":\"%s\",\"type\":\"thermostat\",\"isOn\":%b,\"temperature\":%.1f}",
                deviceId, isOn, temperature);
    }
}
