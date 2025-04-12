package com.smarthome.model;

public interface SmartDevice {
    void turnOn();
    void turnOff();
    boolean isOn();
    String getStatus();
    String getDeviceId();
}
