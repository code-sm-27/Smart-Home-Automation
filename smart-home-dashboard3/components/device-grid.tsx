"use client"

import type { DeviceData } from "@/lib/utils"
import DeviceCard from "./device-card"
import { Skeleton } from "@/components/ui/skeleton"

interface DeviceGridProps {
  devices: DeviceData[]
  onDeviceUpdate: () => void
  isLoading: boolean
}

export default function DeviceGrid({ devices, onDeviceUpdate, isLoading }: DeviceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[180px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (devices.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No devices found</h3>
        <p className="text-muted-foreground">Check your connection to the smart home server.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {devices.map((device) => (
        <DeviceCard key={device.deviceId} device={device} onUpdate={onDeviceUpdate} />
      ))}
    </div>
  )
}

