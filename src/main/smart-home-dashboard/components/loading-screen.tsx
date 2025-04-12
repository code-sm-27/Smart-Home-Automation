"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-8">Loading Smart Home</h2>
        <div className="flex justify-center space-x-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 rounded-full bg-primary"
              animate={{
                y: ["0%", "-100%", "0%"],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

