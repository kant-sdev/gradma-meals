import { Button } from '@/components/ui/button'
import { useRecipeStore } from '@/lib/store'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FavoriteButton() {

  const quantityFav = useRecipeStore((state) => state.favoriteIds.length)

  return (
    <Link href="/favorites">
      <Button
        className="relative shadow border"
        variant="ghost"
        aria-label="Ver favoritos"
        title="Ver seus favoritos"
      >
        <HeartIcon className="text-red-500" />
        <span>Favoritos</span>
        {quantityFav > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {quantityFav}
          </span>
        )}
      </Button>
    </Link>
  )
}
