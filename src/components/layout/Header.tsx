import { ChefHatIcon, HeartIcon } from 'lucide-react'
import React from 'react'
import FavoriteButton from './buttons/favorite-button'

export default function Header() {
  return (
    <header className='shadow flex bg-white'>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHatIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Gradma Meals</h1>
          </div>
          <FavoriteButton />
        </div>
      </div>
    </header>
  )
}
