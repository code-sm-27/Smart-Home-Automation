"use client"

import { useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { fetchDevices } from "@/lib/api"
import type { DeviceData } from "@/lib/utils"
import RoomView from "./room-view"
import DashboardHeader from "./dashboard-header"
import FloorPlan from "./floor-plan"

export default function Dashboard() {
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<"rooms" | "floorplan">("rooms")
  const { theme, setTheme } = useTheme()

  // Use a more efficient way to fetch data that won't cause flickering
  const loadDevices = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchDevices()

      // Only update state if the data has actually changed
      // This helps prevent unnecessary re-renders
      if (JSON.stringify(data) !== JSON.stringify(devices)) {
        setDevices(data)
      }

      setError(null)
    } catch (err) {
      setError("Failed to load devices. Please check your connection.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [devices])

  useEffect(() => {
    loadDevices()

    // Use a less frequent refresh interval to reduce flickering
    const interval = setInterval(() => {
      loadDevices()
    }, 30000) // 30 seconds instead of 10

    return () => clearInterval(interval)
  }, [loadDevices])

  const handleDeviceUpdate = useCallback(() => {
    loadDevices()
  }, [loadDevices])

  const activeDeviceCount = devices.filter((device) => device.isOn).length
  const totalDevices = devices.length

  return (
    <div className="container mx-auto p-4 space-y-6 transition-colors duration-300">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Home Control Center</h1>
          <p className="text-muted-foreground">Monitor and control all your connected devices</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="transition-all duration-200"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button onClick={loadDevices} className="transition-all duration-200">
            Refresh Devices
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DashboardHeader totalDevices={totalDevices} activeDevices={activeDeviceCount} devices={devices} />

      <Card className="p-4 border-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Device Control</h2>
          <div className="flex space-x-2">
            <Button
              variant={view === "rooms" ? "default" : "outline"}
              onClick={() => setView("rooms")}
              className="transition-all duration-200"
            >
              Room View
            </Button>
            <Button
              variant={view === "floorplan" ? "default" : "outline"}
              onClick={() => setView("floorplan")}
              className="transition-all duration-200"
            >
              Floor Plan
            </Button>
          </div>
        </div>

        {view === "rooms" ? (
          <RoomView devices={devices} onDeviceUpdate={handleDeviceUpdate} isLoading={loading} />
        ) : (
          <FloorPlan devices={devices} onDeviceUpdate={handleDeviceUpdate} />
        )}
      </Card>
    </div>
  )
}

