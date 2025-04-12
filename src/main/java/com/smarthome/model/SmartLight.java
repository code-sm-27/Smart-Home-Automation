package com.smarthome.model;

public class SmartLight implements SmartDevice {
    private String deviceId;
    private boolean isOn;
    private int brightness;

    public SmartLight(String deviceId) {
        this.deviceId = deviceId;
        this.isOn = false;
        this.brightness = 50; // Default brightness
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

    public int getBrightness() {
        return brightness;
    }

    public void setBrightness(int brightness) {
        if (brightness >= 0 && brightness <= 100) {
            this.brightness = brightness;
        }
    }

    @Override
    public String getStatus() {
        return String.format("{\"deviceId\":\"%s\",\"type\":\"light\",\"isOn\":%b,\"brightness\":%d}",
                deviceId, isOn, brightness);
    }
}
