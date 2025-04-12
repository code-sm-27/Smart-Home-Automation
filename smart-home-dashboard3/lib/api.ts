import type { DeviceData } from "./utils"

const API_BASE_URL = "http://localhost:8080/api"

export async function fetchDevices(): Promise<DeviceData[]> {
  const response = await fetch(`${API_BASE_URL}/devices`, {
    // Add cache: 'no-store' to prevent browser caching which can cause flickering
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch devices: ${response.status}`)
  }

  const data = await response.json()

  // Parse the JSON strings returned by the Java backend
  return data
    .map((deviceJson: string) => {
      try {
        return JSON.parse(deviceJson)
      } catch (e) {
        console.error("Failed to parse device JSON:", deviceJson)
        return null
      }
    })
    .filter(Boolean)
}

export async function toggleDevice(deviceId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/device/${deviceId}/toggle`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(`Failed to toggle device: ${response.status}`)
  }
}

export async function setBrightness(deviceId: string, brightness: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/light/${deviceId}/brightness?brightness=${brightness}`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(`Failed to set brightness: ${response.status}`)
  }
}

export async function setTemperature(deviceId: string, temperature: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/thermostat/${deviceId}/temperature?temperature=${temperature}`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(`Failed to set temperature: ${response.status}`)
  }
}

export async function toggleRecording(deviceId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/camera/${deviceId}/recording`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(`Failed to toggle recording: ${response.status}`)
  }
}

export async function setVolume(deviceId: string, volume: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/speaker/${deviceId}/volume?volume=${volume}`, {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(`Failed to set volume: ${response.status}`)
  }
}

