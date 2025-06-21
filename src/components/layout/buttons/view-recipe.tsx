import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type ViewRecipeProps = {
  recipeId: number
}

export default function ViewRecipe({recipeId} : ViewRecipeProps) {
  return (
    <Link
      href={`/recipe/${recipeId}`}
      className='hover:cursor-pointer my-2'
    >
      <Button className='w-full'>
        Ver Receita
      </Button>
    </Link>
  )
}
