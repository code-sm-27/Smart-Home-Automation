import type { DeviceData } from "./utils"

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
const cleanApiUrl = rawApiUrl.endsWith("/") ? rawApiUrl.slice(0, -1) : rawApiUrl
export const API_BASE_URL = cleanApiUrl.endsWith("/api") ? cleanApiUrl : `${cleanApiUrl}/api`

function getAuthHeaders() {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function fetchDevices(): Promise<DeviceData[]> {
  const response = await fetch(`${API_BASE_URL}/devices`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  })

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "/login"
    }
    throw new Error(`Failed to fetch devices: ${response.status}`)
  }

  return response.json()
}

export async function toggleDevice(deviceId: string): Promise<DeviceData> {
  const response = await fetch(`${API_BASE_URL}/device/${deviceId}/toggle`, {
    method: "POST",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Failed to toggle device: ${response.status}`)
  }
  return response.json()
}

export async function updateDeviceSettings(deviceId: string, settings: Partial<DeviceData>): Promise<DeviceData> {
  const response = await fetch(`${API_BASE_URL}/device/${deviceId}/settings`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(settings)
  })

  if (!response.ok) {
    throw new Error(`Failed to update device settings: ${response.status}`)
  }
  return response.json()
}

export async function setBrightness(deviceId: string, brightness: number): Promise<void> {
  await updateDeviceSettings(deviceId, { brightness })
}

export async function setTemperature(deviceId: string, temperature: number): Promise<void> {
  await updateDeviceSettings(deviceId, { temperature })
}

export async function toggleRecording(deviceId: string, currentStatus: boolean): Promise<void> {
  await updateDeviceSettings(deviceId, { recording: !currentStatus })
}

export async function setVolume(deviceId: string, volume: number): Promise<void> {
  await updateDeviceSettings(deviceId, { volume })
}
