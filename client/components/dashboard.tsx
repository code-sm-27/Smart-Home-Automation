"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
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
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

export default function Dashboard() {
  const [devices, setDevices] = useState<DeviceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<"rooms" | "floorplan">("rooms")
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const loadDevices = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchDevices()
      if (JSON.stringify(data) !== JSON.stringify(devices)) {
        setDevices(data)
      }
      setError(null)
    } catch (err) {
      setError("Failed to load devices. Please check your connection or login again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [devices])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    loadDevices()

    // Setup WebSocket
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:8080"
    const socket = new SockJS(`${socketUrl}/ws-endpoint`)
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log("Connected to WebSocket")
        stompClient.subscribe('/topic/devices', (message) => {
          if (message.body) {
            const updatedDevice = JSON.parse(message.body)
            setDevices(prev => prev.map(d => d.deviceId === updatedDevice.deviceId ? updatedDevice : d))
          }
        })
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      }
    })

    stompClient.activate()

    return () => {
      stompClient.deactivate()
    }
  }, [])

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

