'use client'

import { useRecipeStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import ItemCards from '../layout/cards/item-cards'
import EmptyFavorites from './not-favorite-screen'
import Header from '../layout/Header'
import BackButton from '../layout/buttons/back-button'
import { Recipe } from '@/types/recipes'
import RecipesLoading from '../layout/loading/recipes-loading'

export default function FavoriteScreen() {
  const { recipes, favoriteIds, loadInitialRecipes } = useRecipeStore()
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (recipes.length === 0) {
        await loadInitialRecipes()
      }
      setIsLoading(false)
    }
    loadData()
  }, [recipes.length, loadInitialRecipes])

  useEffect(() => {
    if (recipes.length > 0) {
      const favs = recipes.filter(recipe =>
        favoriteIds.includes(Number(recipe.id))
      )
      setFavoriteRecipes(favs)
    }
  }, [recipes, favoriteIds])

  const isEmpty = favoriteRecipes.length === 0 && !isLoading

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
      <RecipesLoading/>
    </div>
    )
  }

  return (
    <div>
      <Header />
      <div className='container mx-auto py-4 flex gap-2 items-center'>
        <div className='space-y-4'>
          <BackButton />
          <div className='px-4'>
            <h2 className='text-3xl font-bold'>Receitas Favoritas</h2>
            {isEmpty ? 'Nenhuma receita salva' : `${favoriteRecipes.length} ${favoriteRecipes.length === 1 ? 'receita salva' : 'receitas salvas'}`}
          </div>
        </div>
      </div>

      {isEmpty ? (
        <EmptyFavorites />
      ) : (
        <section className=''>
          <div className="container mx-auto">
            <ItemCards recipes={favoriteRecipes} />
          </div>
        </section>
      )}
    </div>
  )
}