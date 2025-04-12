"use client"

import { type DeviceData, groupDevicesByRoom } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import RoomDevices from "./room-devices"
import { Home, Sofa, Bed, UtensilsCrossed, Car } from "lucide-react"

interface RoomViewProps {
  devices: DeviceData[]
  onDeviceUpdate: () => void
  isLoading: boolean
}

export default function RoomView({ devices, onDeviceUpdate, isLoading }: RoomViewProps) {
  const devicesByRoom = groupDevicesByRoom(devices)
  const roomNames = Object.keys(devicesByRoom)

  if (isLoading && devices.length === 0) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (roomNames.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No rooms found</h3>
        <p className="text-muted-foreground">Check your connection to the smart home server.</p>
      </div>
    )
  }

  const getRoomIcon = (roomName: string) => {
    switch (roomName) {
      case "Living Room":
        return <Sofa className="h-4 w-4" />
      case "Bedroom":
        return <Bed className="h-4 w-4" />
      case "Kitchen":
        return <UtensilsCrossed className="h-4 w-4" />
      case "Garage":
        return <Car className="h-4 w-4" />
      default:
        return <Home className="h-4 w-4" />
    }
  }

  return (
    <Tabs defaultValue={roomNames[0]} className="w-full">
      <TabsList className="flex w-full h-auto flex-wrap mb-6 bg-transparent">
        {roomNames.map((room) => (
          <TabsTrigger
            key={room}
            value={room}
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
          >
            {getRoomIcon(room)}
            {room}
          </TabsTrigger>
        ))}
      </TabsList>

      {roomNames.map((room) => (
        <TabsContent key={room} value={room} className="mt-0 border-0 p-0">
          <RoomDevices roomName={room} devices={devicesByRoom[room]} onDeviceUpdate={onDeviceUpdate} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

