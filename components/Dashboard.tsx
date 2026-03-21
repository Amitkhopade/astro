'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  const recentReports = [
    { name: 'John Doe', date: 'March 15, 2023', status: 'Complete' },
    { name: 'Jane Smith', date: 'July 22, 2022', status: 'Complete' },
    { name: 'Alex Johnson', date: 'January 10, 2024', status: 'Processing' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants} className="glassmorphism p-6">
        <h4 className="font-playfair text-cosmic-gold mb-4">Recent Kundalis</h4>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="font-semibold">{report.name}</p>
                <p className="text-sm text-gray-400">{report.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  report.status === 'Complete' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {report.status}
                </span>
                <button className="text-cosmic-gold hover:text-cosmic-gold/80">📄</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glassmorphism p-6">
        <h4 className="font-playfair text-cosmic-gold mb-4">Quick Actions</h4>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Manual Entry
          </button>
          <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Saved Templates
          </button>
          <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            Export Data
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glassmorphism p-6">
        <h4 className="font-playfair text-cosmic-gold mb-4">Astrological Insights</h4>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="font-semibold">Today's Transit</p>
            <p className="text-gray-400">Moon in Cancer - Emotional day ahead</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="font-semibold">Weekly Forecast</p>
            <p className="text-gray-400">Career opportunities peaking</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}