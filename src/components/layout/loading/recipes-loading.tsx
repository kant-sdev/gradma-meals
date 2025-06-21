'use client'

import { motion } from 'framer-motion'

export default function RecipesLoading() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 rounded-full bg-primary"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'loop',
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    </div>
  )
}
