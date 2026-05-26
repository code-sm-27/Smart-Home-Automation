"use client"

import type { DeviceData } from "@/lib/utils"
import DeviceCard from "./device-card"

interface RoomDevicesProps {
  roomName: string
  devices: DeviceData[]
  onDeviceUpdate: () => void
}

export default function RoomDevices({ roomName, devices, onDeviceUpdate }: RoomDevicesProps) {
  // Group devices by type within the room
  const lightDevices = devices.filter((d) => d.type === "light")
  const thermostatDevices = devices.filter((d) => d.type === "thermostat")
  const plugDevices = devices.filter((d) => d.type === "plug")
  const cameraDevices = devices.filter((d) => d.type === "camera")
  const speakerDevices = devices.filter((d) => d.type === "speaker")

  const renderDeviceSection = (title: string, deviceList: DeviceData[]) => {
    if (deviceList.length === 0) return null

    return (
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 capitalize">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deviceList.map((device) => (
            <DeviceCard key={device.deviceId} device={device} onUpdate={onDeviceUpdate} roomName={roomName} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-8">
        {renderDeviceSection("Lights", lightDevices)}
        {renderDeviceSection("Thermostats", thermostatDevices)}
        {renderDeviceSection("Smart Plugs", plugDevices)}
        {renderDeviceSection("Cameras", cameraDevices)}
        {renderDeviceSection("Speakers", speakerDevices)}
      </div>
    </div>
  )
}

