'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-white/10 py-6"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-playfair text-cosmic-gold">Astral Nexus</h1>
          <p className="text-sm text-gray-400">Vedic Astrology Reimagined</p>
        </div>
        <nav className="flex space-x-6">
          <button className="text-gray-300 hover:text-cosmic-gold transition-colors">
            Dashboard
          </button>
          <button className="text-gray-300 hover:text-cosmic-gold transition-colors">
            Reports
          </button>
          <button className="text-gray-300 hover:text-cosmic-gold transition-colors">
            Settings
          </button>
        </nav>
      </div>
    </motion.header>
  )
}