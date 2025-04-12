// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Fetch all devices
export async function fetchDevices(): Promise<string[]> {
  const response = await fetch(`${API_URL}/devices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch devices")
  }

  return response.json()
}

// Toggle a device on/off
export async function toggleDevice(deviceId: string): Promise<string> {
  const response = await fetch(`${API_URL}/device/${deviceId}/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to toggle device ${deviceId}`)
  }

  return response.text()
}

// Set brightness for a light
export async function setBrightness(deviceId: string, brightness: number): Promise<string> {
  const response = await fetch(`${API_URL}/light/${deviceId}/brightness?brightness=${brightness}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to set brightness for ${deviceId}`)
  }

  return response.text()
}

// Set temperature for a thermostat
export async function setTemperature(deviceId: string, temperature: number): Promise<string> {
  const response = await fetch(`${API_URL}/thermostat/${deviceId}/temperature?temperature=${temperature}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to set temperature for ${deviceId}`)
  }

  return response.text()
}

