"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { type DeviceData, getDeviceDisplayName } from "@/lib/utils"
import { toggleDevice, setBrightness, setTemperature, toggleRecording, setVolume } from "@/lib/api"
import { Lightbulb, Thermometer, Power, Video, Volume2, Loader2, VideoOff } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DeviceCardProps {
  device: DeviceData
  onUpdate: () => void
  roomName?: string
}

export default function DeviceCard({ device, onUpdate, roomName }: DeviceCardProps) {
  const [loading, setLoading] = useState(false)
  const [localState, setLocalState] = useState({
    isOn: device.isOn,
    brightness: device.brightness || 50,
    temperature: device.temperature || 20,
    volume: device.volume || 50,
    isRecording: device.isRecording || false,
  })

  useEffect(() => {
    setLocalState({
      isOn: device.isOn,
      brightness: device.brightness || 50,
      temperature: device.temperature || 20,
      volume: device.volume || 50,
      isRecording: device.isRecording || false,
    })
  }, [device])

  const handleToggle = async () => {
    try {
      setLoading(true)
      await toggleDevice(device.deviceId)
      setLocalState((prev) => ({ ...prev, isOn: !prev.isOn }))
      onUpdate()
    } catch (error) {
      console.error("Failed to toggle device:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBrightnessChange = async (value: number[]) => {
    if (device.type !== "light") return
    setLocalState((prev) => ({ ...prev, brightness: value[0] }))
  }

  const handleBrightnessCommit = async (value: number[]) => {
    if (device.type !== "light") return
    try {
      setLoading(true)
      await setBrightness(device.deviceId, value[0])
      onUpdate()
    } catch (error) {
      console.error("Failed to set brightness:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTemperatureChange = async (value: number[]) => {
    if (device.type !== "thermostat") return
    setLocalState((prev) => ({ ...prev, temperature: value[0] }))
  }

  const handleTemperatureCommit = async (value: number[]) => {
    if (device.type !== "thermostat") return
    try {
      setLoading(true)
      await setTemperature(device.deviceId, value[0])
      onUpdate()
    } catch (error) {
      console.error("Failed to set temperature:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecordingToggle = async () => {
    if (device.type !== "camera") return
    try {
      setLoading(true)
      await toggleRecording(device.deviceId)
      setLocalState((prev) => ({ ...prev, isRecording: !prev.isRecording }))
      onUpdate()
    } catch (error) {
      console.error("Failed to toggle recording:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVolumeChange = async (value: number[]) => {
    if (device.type !== "speaker") return
    setLocalState((prev) => ({ ...prev, volume: value[0] }))
  }

  const handleVolumeCommit = async (value: number[]) => {
    if (device.type !== "speaker") return
    try {
      setLoading(true)
      await setVolume(device.deviceId, value[0])
      onUpdate()
    } catch (error) {
      console.error("Failed to set volume:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDeviceIcon = () => {
    const size = "h-8 w-8"
    const activeColor = localState.isOn ? "opacity-100" : "opacity-40"

    switch (device.type) {
      case "light":
        return (
          <div
            className={`rounded-full p-3 bg-yellow-100 dark:bg-yellow-900/30 ${activeColor} transition-all duration-300`}
          >
            <Lightbulb className={`${size} text-yellow-500`} />
          </div>
        )
      case "thermostat":
        return (
          <div
            className={`rounded-full p-3 bg-blue-100 dark:bg-blue-900/30 ${activeColor} transition-all duration-300`}
          >
            <Thermometer className={`${size} text-blue-500`} />
          </div>
        )
      case "plug":
        return (
          <div
            className={`rounded-full p-3 bg-green-100 dark:bg-green-900/30 ${activeColor} transition-all duration-300`}
          >
            <Power className={`${size} text-green-500`} />
          </div>
        )
      case "camera":
        return (
          <div className={`rounded-full p-3 bg-red-100 dark:bg-red-900/30 ${activeColor} transition-all duration-300`}>
            <Video className={`${size} text-red-500`} />
          </div>
        )
      case "speaker":
        return (
          <div
            className={`rounded-full p-3 bg-purple-100 dark:bg-purple-900/30 ${activeColor} transition-all duration-300`}
          >
            <Volume2 className={`${size} text-purple-500`} />
          </div>
        )
      default:
        return (
          <div className={`rounded-full p-3 bg-gray-100 dark:bg-gray-800 ${activeColor} transition-all duration-300`}>
            <Power className={`${size} text-gray-500`} />
          </div>
        )
    }
  }

  const displayName = getDeviceDisplayName(device.deviceId, device.type)

  return (
    <TooltipProvider>
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
          localState.isOn
            ? device.type === "light"
              ? "border-yellow-500/50"
              : device.type === "thermostat"
                ? "border-blue-500/50"
                : device.type === "plug"
                  ? "border-green-500/50"
                  : device.type === "camera"
                    ? "border-red-500/50"
                    : device.type === "speaker"
                      ? "border-purple-500/50"
                      : "border-primary/50"
            : "border-muted"
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getDeviceIcon()}
              <div>
                <h3 className="font-medium">{displayName}</h3>
                <p className="text-xs text-muted-foreground">{device.deviceId}</p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Switch
                      checked={localState.isOn}
                      onCheckedChange={handleToggle}
                      className="transition-all duration-200"
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Turn {localState.isOn ? "Off" : "On"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>Status</span>
              <span className={localState.isOn ? "text-green-500 dark:text-green-400" : "text-muted-foreground"}>
                {localState.isOn ? "On" : "Off"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          {localState.isOn && (
            <>
              {device.type === "light" && (
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-sm">Brightness</span>
                    <span className="text-sm font-medium">{localState.brightness}%</span>
                  </div>
                  <Slider
                    value={[localState.brightness]}
                    max={100}
                    step={1}
                    onValueChange={handleBrightnessChange}
                    onValueCommit={handleBrightnessCommit}
                    className="transition-all duration-200"
                  />
                </div>
              )}
              {device.type === "thermostat" && (
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="text-sm font-medium">{localState.temperature}°C</span>
                  </div>
                  <Slider
                    value={[localState.temperature]}
                    min={15}
                    max={30}
                    step={0.5}
                    onValueChange={handleTemperatureChange}
                    onValueCommit={handleTemperatureCommit}
                    className="transition-all duration-200"
                  />
                </div>
              )}
              {device.type === "camera" && (
                <Button
                  variant={localState.isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="w-full transition-all duration-200"
                  onClick={handleRecordingToggle}
                >
                  {localState.isRecording ? (
                    <>
                      <VideoOff className="mr-2 h-4 w-4" /> Stop Recording
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" /> Start Recording
                    </>
                  )}
                </Button>
              )}
              {device.type === "speaker" && (
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-sm">Volume</span>
                    <span className="text-sm font-medium">{localState.volume}%</span>
                  </div>
                  <Slider
                    value={[localState.volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    onValueCommit={handleVolumeCommit}
                    className="transition-all duration-200"
                  />
                </div>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

