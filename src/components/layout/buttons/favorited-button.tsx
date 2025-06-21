'use client'

import { Button } from '@/components/ui/button'
import { useRecipeStore } from '@/lib/store'
import { HeartIcon } from 'lucide-react'
import { toast } from 'sonner'

type FavoritedButtonProps = {
  id: number
}

export default function FavoritedButton({ id }: FavoritedButtonProps) {
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite)
  const isFavorite = useRecipeStore((state) => state.isFavorite(id))

  const handleClick = () => {
    toggleFavorite(id)
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
  }

  return (
    <Button
      variant="ghost"
      className={`absolute top-2 right-2 ${
        isFavorite ? 'text-red-500' : 'text-gray-400'
      } bg-white/70 hover:bg-white`}
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
    >
      <HeartIcon
        fill={isFavorite ? 'red' : 'none'}
        className="w-5 h-5 transition-all"
      />
    </Button>
  )
}
