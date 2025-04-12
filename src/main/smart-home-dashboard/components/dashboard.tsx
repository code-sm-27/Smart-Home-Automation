"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DeviceCard from "@/components/device-card"
import { fetchDevices } from "@/lib/api"
import LoadingScreen from "@/components/loading-screen"

export default function Dashboard() {
  const [devices, setDevices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devicesList = await fetchDevices()
        // Parse JSON strings into objects
        const parsedDevices = devicesList.map((device: string) => JSON.parse(device))
        setDevices(parsedDevices)
      } catch (error) {
        console.error("Failed to fetch devices:", error)
      } finally {
        setLoading(false)
      }
    }

    getDevices()

    // Poll for updates every 10 seconds
    const interval = setInterval(getDevices, 10000)
    return () => clearInterval(interval)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Smart Home
        </motion.h1>
        <motion.p
          className="text-xl text-center text-zinc-400"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Control your connected devices
        </motion.p>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {devices.map((device, index) => (
          <DeviceCard
            key={device.deviceId}
            device={device}
            onUpdate={(updatedDevice) => {
              const newDevices = [...devices]
              newDevices[index] = updatedDevice
              setDevices(newDevices)
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

