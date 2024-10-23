'use client'

import { motion } from 'framer-motion'

export default function TradocumentLogo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white w-16 h-16 flex items-center justify-center mr-2 border border-gray-300">
          <span className="text-black text-4xl font-bold">T</span>
        </div>
        <div className="flex flex-col">
          <motion.h1 
            className="text-gray-100 text-4xl font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            RADOCUMENT
          </motion.h1>
          <motion.div 
            className="h-1 bg-orange-400 mt-1"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}