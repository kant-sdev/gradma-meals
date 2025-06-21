'use client'

import Header from '@/components/layout/Header'
import SearchTerm from '@/components/layout/inputs/search-term'
import { useAllRecipes } from '@/hooks/use-all-recipes'
import React, { useMemo, useState } from 'react'
import ItemCards from '../layout/cards/item-cards'
import RecipesLoading from '../layout/loading/recipes-loading'

export default function Homepage() {
  const { data: recipes, isLoading } = useAllRecipes()
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedCuisine: 'all',
  })

  const availableCuisines = useMemo(() => {
    return recipes ? Array.from(new Set(recipes.map((r) => r.cuisine))) : []
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    if (!recipes) return []
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase())
      const matchesCuisine =
        filters.selectedCuisine === 'all' || recipe.cuisine === filters.selectedCuisine
      return matchesSearch && matchesCuisine
    })
  }, [recipes, filters])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <RecipesLoading />
      </div>)
  }
  if (!recipes) return <p>Nenhuma receita Encontrada</p>

  return (
    <div className=''>
      <Header />
      <SearchTerm
        availableCuisines={availableCuisines}
        onFilterChange={setFilters}
      />
      <ItemCards recipes={filteredRecipes} />
    </div>
  )
}
