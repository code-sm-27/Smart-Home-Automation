"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toggleDevice, setBrightness, setTemperature } from "@/lib/api"
import { Lightbulb, Thermometer } from "lucide-react"

interface DeviceCardProps {
  device: any
  onUpdate: (updatedDevice: any) => void
}

export default function DeviceCard({ device, onUpdate }: DeviceCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggle = async () => {
    setIsUpdating(true)
    try {
      const result = await toggleDevice(device.deviceId)
      onUpdate(JSON.parse(result))
    } catch (error) {
      console.error(`Failed to toggle device ${device.deviceId}:`, error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleBrightnessChange = async (value: number[]) => {
    if (device.type !== "light") return

    setIsUpdating(true)
    try {
      const result = await setBrightness(device.deviceId, value[0])
      onUpdate(JSON.parse(result))
    } catch (error) {
      console.error(`Failed to set brightness for ${device.deviceId}:`, error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleTemperatureChange = async (value: number[]) => {
    if (device.type !== "thermostat") return

    setIsUpdating(true)
    try {
      const result = await setTemperature(device.deviceId, value[0])
      onUpdate(JSON.parse(result))
    } catch (error) {
      console.error(`Failed to set temperature for ${device.deviceId}:`, error)
    } finally {
      setIsUpdating(false)
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className={`overflow-hidden ${isUpdating ? "opacity-70" : ""}`}>
        <CardHeader className={`${device.isOn ? "bg-primary/10" : "bg-muted"} transition-colors duration-500`}>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3">
              {device.type === "light" ? (
                <DeviceIcon Icon={Lightbulb} isOn={device.isOn} brightness={device.brightness} />
              ) : (
                <DeviceIcon Icon={Thermometer} isOn={device.isOn} temperature={device.temperature} />
              )}
              {getDisplayName(device.deviceId)}
            </CardTitle>
            <Switch checked={device.isOn} onCheckedChange={handleToggle} disabled={isUpdating} />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {device.type === "light" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Brightness</span>
                <span className="text-sm font-medium">{device.brightness}%</span>
              </div>
              <Slider
                disabled={!device.isOn || isUpdating}
                value={[device.brightness]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleBrightnessChange}
              />
              <LightVisualization isOn={device.isOn} brightness={device.brightness} />
            </div>
          )}

          {device.type === "thermostat" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Temperature</span>
                <span className="text-sm font-medium">{device.temperature}°C</span>
              </div>
              <Slider
                disabled={!device.isOn || isUpdating}
                value={[device.temperature]}
                min={15}
                max={30}
                step={0.5}
                onValueChange={handleTemperatureChange}
              />
              <ThermostatVisualization isOn={device.isOn} temperature={device.temperature} />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getDisplayName(deviceId: string) {
  if (deviceId === "LR-L1") return "Living Room Light"
  if (deviceId === "BR-L1") return "Bedroom Light"
  if (deviceId === "T1") return "Main Thermostat"
  return deviceId
}

interface DeviceIconProps {
  Icon: any
  isOn: boolean
  brightness?: number
  temperature?: number
}

function DeviceIcon({ Icon, isOn, brightness, temperature }: DeviceIconProps) {
  let color = "text-muted-foreground"

  if (isOn) {
    if (brightness !== undefined) {
      color = "text-yellow-400"
    } else if (temperature !== undefined) {
      // Color based on temperature
      if (temperature < 20) {
        color = "text-blue-400"
      } else if (temperature > 25) {
        color = "text-red-400"
      } else {
        color = "text-green-400"
      }
    }
  }

  return (
    <motion.div
      animate={isOn ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.5, repeat: isOn ? Number.POSITIVE_INFINITY : 0, repeatDelay: 3 }}
    >
      <Icon className={`size-6 ${color}`} />
    </motion.div>
  )
}

function LightVisualization({ isOn, brightness }: { isOn: boolean; brightness: number }) {
  const radius = brightness / 2
  const opacity = (brightness / 100) * 0.8

  return (
    <div className="flex justify-center mt-4">
      <motion.div
        className="relative w-16 h-16 flex items-center justify-center"
        initial={false}
        animate={
          isOn
            ? {
                opacity: 1,
              }
            : {
                opacity: 0.3,
              }
        }
      >
        <motion.div
          className="absolute rounded-full bg-yellow-400"
          initial={false}
          animate={
            isOn
              ? {
                  width: `${radius}px`,
                  height: `${radius}px`,
                  opacity: opacity,
                }
              : {
                  width: 0,
                  height: 0,
                  opacity: 0,
                }
          }
          transition={{ duration: 0.4 }}
        />
        <Lightbulb className={`size-8 z-10 ${isOn ? "text-yellow-400" : "text-muted-foreground"}`} />
      </motion.div>
    </div>
  )
}

function ThermostatVisualization({ isOn, temperature }: { isOn: boolean; temperature: number }) {
  // Normalize temperature to a 0-1 scale (15°C to 30°C)
  const normalizedTemp = (temperature - 15) / (30 - 15)

  // Calculate color based on temperature
  let color = "bg-blue-500"
  if (temperature > 24) color = "bg-red-500"
  else if (temperature > 20) color = "bg-orange-500"
  else if (temperature > 17) color = "bg-green-500"

  return (
    <div className="flex justify-center mt-4">
      <div className="w-16 h-16 flex items-center justify-center relative">
        <div className="w-4 h-16 bg-muted rounded-full relative overflow-hidden">
          <motion.div
            className={`absolute bottom-0 w-full ${color}`}
            initial={false}
            animate={{ height: `${isOn ? normalizedTemp * 100 : 0}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <motion.div
          className="absolute text-lg font-bold"
          initial={false}
          animate={isOn ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
        >
          {isOn ? (
            <motion.span
              key={temperature}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              {temperature}°
            </motion.span>
          ) : (
            "OFF"
          )}
        </motion.div>
      </div>
    </div>
  )
}

