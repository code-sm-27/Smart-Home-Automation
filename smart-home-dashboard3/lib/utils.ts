import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface DeviceData {
  deviceId: string
  type: "light" | "thermostat" | "plug" | "camera" | "speaker"
  isOn: boolean
  brightness?: number
  temperature?: number
  isRecording?: boolean
  volume?: number
}

export function groupDevicesByRoom(devices: DeviceData[]): Record<string, DeviceData[]> {
  const result: Record<string, DeviceData[]> = {}

  devices.forEach((device) => {
    const roomPrefix = device.deviceId.split("-")[0]
    let roomName: string

    switch (roomPrefix) {
      case "LR":
        roomName = "Living Room"
        break
      case "BR":
        roomName = "Bedroom"
        break
      case "KT":
        roomName = "Kitchen"
        break
      case "GR":
        roomName = "Garage"
        break
      default:
        roomName = "Other"
    }

    if (!result[roomName]) {
      result[roomName] = []
    }

    result[roomName].push(device)
  })

  return result
}

export function groupDevicesByType(devices: DeviceData[]): Record<string, DeviceData[]> {
  const result: Record<string, DeviceData[]> = {}

  devices.forEach((device) => {
    if (!result[device.type]) {
      result[device.type] = []
    }

    result[device.type].push(device)
  })

  return result
}

export function getDeviceDisplayName(deviceId: string, type: string): string {
  const roomPrefix = deviceId.split("-")[0]
  const deviceNumber = deviceId.split("-")[1]
  let roomName: string

  switch (roomPrefix) {
    case "LR":
      roomName = "Living Room"
      break
    case "BR":
      roomName = "Bedroom"
      break
    case "KT":
      roomName = "Kitchen"
      break
    case "GR":
      roomName = "Garage"
      break
    default:
      roomName = "Other"
  }

  let deviceTypeName: string
  switch (type) {
    case "light":
      deviceTypeName = "Light"
      break
    case "thermostat":
      deviceTypeName = "Thermostat"
      break
    case "plug":
      deviceTypeName = "Smart Plug"
      break
    case "camera":
      deviceTypeName = "Camera"
      break
    case "speaker":
      deviceTypeName = "Speaker"
      break
    default:
      deviceTypeName = "Device"
  }

  return `${roomName} ${deviceTypeName} ${deviceNumber}`
}

