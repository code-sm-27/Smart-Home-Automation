"use client"

import { useState } from "react"
import { type DeviceData, getDeviceDisplayName } from "@/lib/utils"
import { Lightbulb, Thermometer, Power, Video, Volume2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DeviceCard from "./device-card"

interface FloorPlanProps {
  devices: DeviceData[]
  onDeviceUpdate: () => void
}

export default function FloorPlan({ devices, onDeviceUpdate }: FloorPlanProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null)

  const getDeviceIcon = (device: DeviceData) => {
    const isActive = device.isOn
    const size = "h-6 w-6"

    switch (device.type) {
      case "light":
        return <Lightbulb className={`${size} ${isActive ? "text-yellow-500" : "text-gray-400"}`} />
      case "thermostat":
        return <Thermometer className={`${size} ${isActive ? "text-blue-500" : "text-gray-400"}`} />
      case "plug":
        return <Power className={`${size} ${isActive ? "text-green-500" : "text-gray-400"}`} />
      case "camera":
        return <Video className={`${size} ${isActive ? "text-red-500" : "text-gray-400"}`} />
      case "speaker":
        return <Volume2 className={`${size} ${isActive ? "text-purple-500" : "text-gray-400"}`} />
      default:
        return <Power className={`${size} ${isActive ? "text-green-500" : "text-gray-400"}`} />
    }
  }

  const handleDeviceClick = (device: DeviceData) => {
    setSelectedDevice(device)
  }

  const handleDialogClose = () => {
    setSelectedDevice(null)
  }

  return (
    <TooltipProvider>
      <div className="relative w-full h-[600px] border-2 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Living Room */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] border-2 border-gray-300 dark:border-gray-700 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
          <span className="absolute top-2 left-2 text-sm font-medium">Living Room</span>
          <div className="grid grid-cols-3 gap-4 p-4">
            {devices
              .filter((d) => d.deviceId.startsWith("LR"))
              .map((device) => (
                <Tooltip key={device.deviceId}>
                  <TooltipTrigger asChild>
                    <button
                      className={`p-3 rounded-full transition-all duration-200 ${
                        device.isOn
                          ? device.type === "light"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : device.type === "thermostat"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : device.type === "plug"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : device.type === "camera"
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                      onClick={() => handleDeviceClick(device)}
                    >
                      {getDeviceIcon(device)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDeviceDisplayName(device.deviceId, device.type)}</p>
                    <p className="text-xs">{device.isOn ? "On" : "Off"}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>

        {/* Bedroom */}
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] border-2 border-gray-300 dark:border-gray-700 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center">
          <span className="absolute top-2 left-2 text-sm font-medium">Bedroom</span>
          <div className="grid grid-cols-2 gap-4 p-4">
            {devices
              .filter((d) => d.deviceId.startsWith("BR"))
              .map((device) => (
                <Tooltip key={device.deviceId}>
                  <TooltipTrigger asChild>
                    <button
                      className={`p-3 rounded-full transition-all duration-200 ${
                        device.isOn
                          ? device.type === "light"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : device.type === "thermostat"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : device.type === "plug"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : device.type === "camera"
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                      onClick={() => handleDeviceClick(device)}
                    >
                      {getDeviceIcon(device)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDeviceDisplayName(device.deviceId, device.type)}</p>
                    <p className="text-xs">{device.isOn ? "On" : "Off"}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>

        {/* Kitchen */}
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] border-2 border-gray-300 dark:border-gray-700 bg-green-50/50 dark:bg-green-950/20 rounded-lg flex items-center justify-center">
          <span className="absolute top-2 left-2 text-sm font-medium">Kitchen</span>
          <div className="grid grid-cols-2 gap-4 p-4">
            {devices
              .filter((d) => d.deviceId.startsWith("KT"))
              .map((device) => (
                <Tooltip key={device.deviceId}>
                  <TooltipTrigger asChild>
                    <button
                      className={`p-3 rounded-full transition-all duration-200 ${
                        device.isOn
                          ? device.type === "light"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : device.type === "thermostat"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : device.type === "plug"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : device.type === "camera"
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                      onClick={() => handleDeviceClick(device)}
                    >
                      {getDeviceIcon(device)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDeviceDisplayName(device.deviceId, device.type)}</p>
                    <p className="text-xs">{device.isOn ? "On" : "Off"}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>

        {/* Garage */}
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] border-2 border-gray-300 dark:border-gray-700 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center">
          <span className="absolute top-2 left-2 text-sm font-medium">Garage</span>
          <div className="grid grid-cols-2 gap-4 p-4">
            {devices
              .filter((d) => d.deviceId.startsWith("GR"))
              .map((device) => (
                <Tooltip key={device.deviceId}>
                  <TooltipTrigger asChild>
                    <button
                      className={`p-3 rounded-full transition-all duration-200 ${
                        device.isOn
                          ? device.type === "light"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : device.type === "thermostat"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : device.type === "plug"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : device.type === "camera"
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                      onClick={() => handleDeviceClick(device)}
                    >
                      {getDeviceIcon(device)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDeviceDisplayName(device.deviceId, device.type)}</p>
                    <p className="text-xs">{device.isOn ? "On" : "Off"}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>

        {/* Other devices not assigned to a specific room */}
        <div className="absolute top-[55%] left-[45%] w-[10%] h-[10%] border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="absolute top-2 left-2 text-xs font-medium">Other</span>
          <div className="grid grid-cols-2 gap-2 p-2">
            {devices
              .filter(
                (d) =>
                  !d.deviceId.startsWith("LR") &&
                  !d.deviceId.startsWith("BR") &&
                  !d.deviceId.startsWith("KT") &&
                  !d.deviceId.startsWith("GR"),
              )
              .map((device) => (
                <Tooltip key={device.deviceId}>
                  <TooltipTrigger asChild>
                    <button
                      className={`p-2 rounded-full transition-all duration-200 ${
                        device.isOn
                          ? device.type === "light"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : device.type === "thermostat"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : device.type === "plug"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : device.type === "camera"
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                      onClick={() => handleDeviceClick(device)}
                    >
                      {getDeviceIcon(device)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDeviceDisplayName(device.deviceId, device.type)}</p>
                    <p className="text-xs">{device.isOn ? "On" : "Off"}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>
      </div>

      <Dialog open={selectedDevice !== null} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDevice && getDeviceDisplayName(selectedDevice.deviceId, selectedDevice.type)}
            </DialogTitle>
          </DialogHeader>
          {selectedDevice && <DeviceCard device={selectedDevice} onUpdate={onDeviceUpdate} />}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}

