"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type DeviceData, groupDevicesByType } from "@/lib/utils"
import { Lightbulb, Thermometer, Power, Video, Volume2 } from "lucide-react"

interface DashboardHeaderProps {
  totalDevices: number
  activeDevices: number
  devices: DeviceData[]
}

export default function DashboardHeader({ totalDevices, activeDevices, devices }: DashboardHeaderProps) {
  const devicesByType = groupDevicesByType(devices)

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case "light":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />
      case "thermostat":
        return <Thermometer className="h-5 w-5 text-blue-500" />
      case "plug":
        return <Power className="h-5 w-5 text-green-500" />
      case "camera":
        return <Video className="h-5 w-5 text-red-500" />
      case "speaker":
        return <Volume2 className="h-5 w-5 text-purple-500" />
      default:
        return <Power className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          <Power className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDevices}</div>
          <p className="text-xs text-muted-foreground">Connected to your home</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          <Power className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeDevices}</div>
          <p className="text-xs text-muted-foreground">Currently powered on</p>
        </CardContent>
      </Card>

      {Object.entries(devicesByType).map(([type, typeDevices]) => (
        <Card
          key={type}
          className={`transition-all duration-200 hover:shadow-md ${
            type === "light"
              ? "bg-gradient-to-br from-yellow-500/20 to-yellow-500/5"
              : type === "thermostat"
                ? "bg-gradient-to-br from-blue-500/20 to-blue-500/5"
                : type === "plug"
                  ? "bg-gradient-to-br from-green-500/20 to-green-500/5"
                  : type === "camera"
                    ? "bg-gradient-to-br from-red-500/20 to-red-500/5"
                    : "bg-gradient-to-br from-purple-500/20 to-purple-500/5"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize">{type}s</CardTitle>
            {getDeviceTypeIcon(type)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{typeDevices.length}</div>
            <p className="text-xs text-muted-foreground">{typeDevices.filter((d) => d.isOn).length} active</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

