package com.smarthome.model;

public class SmartSpeaker implements SmartDevice {
    private String deviceId;
    private boolean isOn;
    private int volume; // Volume level (0 to 100)

    public SmartSpeaker(String deviceId) {
        this.deviceId = deviceId;
        this.isOn = false;
        this.volume = 50; // Default volume
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

    public void setVolume(int volume) {
        if (volume >= 0 && volume <= 100) {
            this.volume = volume;
        }
    }

    public int getVolume() {
        return volume;
    }

    @Override
    public String getStatus() {
        return String.format("{\"deviceId\":\"%s\",\"type\":\"speaker\",\"isOn\":%b,\"volume\":%d}", deviceId, isOn, volume);
    }

    @Override
    public String getDeviceId() {
        return deviceId;
    }
}