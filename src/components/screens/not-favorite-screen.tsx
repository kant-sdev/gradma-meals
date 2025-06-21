'use client'

import { motion } from 'framer-motion'

export default function EmptyFavorites() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.2, 0.8, 0.3, 1.1]
          }
        }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-500"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0, rotate: -30 }}
          animate={{
            pathLength: 1,
            rotate: 0,
            transition: {
              delay: 0.3,
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </motion.svg>
        <motion.h2
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5
            }
          }}
        >
          Nenhuma receita favoritada ainda
        </motion.h2>
        <motion.p
          className="max-w-xs"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.7,
              duration: 0.5
            }
          }}
        >
          Você ainda não adicionou nenhuma receita aos favoritos. Vá explorar e salve suas receitas preferidas!
        </motion.p>
      </motion.div>
    </section>
  )
}