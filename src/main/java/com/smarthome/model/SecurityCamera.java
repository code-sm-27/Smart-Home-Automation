package com.smarthome.model;

public class SecurityCamera implements SmartDevice {
    private String deviceId;
    private boolean isOn;
    private boolean isRecording;

    public SecurityCamera(String deviceId) {
        this.deviceId = deviceId;
        this.isOn = false;
        this.isRecording = false;
    }

    @Override
    public void turnOn() {
        this.isOn = true;
    }

    @Override
    public void turnOff() {
        this.isOn = false;
        this.isRecording = false; // Stop recording when turned off
    }

    @Override
    public boolean isOn() {
        return isOn;
    }

    public void startRecording() {
        if (isOn) {
            this.isRecording = true;
        }
    }

    public void stopRecording() {
        this.isRecording = false;
    }
    public boolean isRecording()
    {
        return this.isRecording;
    }
    @Override
    public String getStatus() {
        return String.format("{\"deviceId\":\"%s\",\"type\":\"camera\",\"isOn\":%b,\"isRecording\":%b}", deviceId, isOn, isRecording);
    }

    @Override
    public String getDeviceId() {
        return deviceId;
    }
}