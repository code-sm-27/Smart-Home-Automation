package com.smarthome.model;

public class SmartPlug implements SmartDevice {
    private String deviceId;
    private boolean isOn;

    public SmartPlug(String deviceId) {
        this.deviceId = deviceId;
        this.isOn = false;
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
    public String getStatus() {
        return String.format("{\"deviceId\":\"%s\",\"type\":\"plug\",\"isOn\":%b}", deviceId, isOn);
    }

    @Override
    public String getDeviceId() {
        return deviceId;
    }
}