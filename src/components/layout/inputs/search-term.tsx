'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Search, Filter } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'

type Props = {
  availableCuisines: string[]
  onFilterChange: (filters: {
    searchTerm: string
    selectedCuisine: string
  }) => void
  className?: string
  searchDelay?: number
}

export default function SearchTerm({
  availableCuisines,
  onFilterChange,
  className = '',
  searchDelay = 300
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  // Debounce para evitar muitas chamadas durante a digitação
  useEffect(() => {
    setIsFiltering(true)
    const handler = setTimeout(() => {
      onFilterChange({ searchTerm, selectedCuisine })
      setIsFiltering(false)
    }, searchDelay)

    return () => clearTimeout(handler)
  }, [searchTerm, selectedCuisine, searchDelay, onFilterChange])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCuisine('all')
  }, [])

  const hasFilters = searchTerm !== '' || selectedCuisine !== 'all'

  return (
    <section className="py-6">
      <div
        className={`
          ${className} container mx-auto 
          flex flex-col gap-4 px-4
          md:flex-row md:items-center 
        `}
      >
        <div className="relative flex-grow min-w-0">
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all ${
              inputFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Search className="h-5 w-5" />
          </div>
          <Input
            placeholder="Buscar restaurante, comida..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className={`text-base pl-10 pr-8 rounded-md shadow-sm transition-all bg-white placeholder:text-muted-foreground ${
              inputFocused ? 'ring-2 ring-primary/50 border-primary' : ''
            }`}
            aria-label="Buscar restaurantes"
          />
        </div>

        <div className="w-full md:w-48 lg:w-56 xl:w-64">
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger
              className={`w-full p-2 text-base rounded-md shadow-sm transition-all ${
                selectedCuisine !== 'all' ? 'border-primary text-primary' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Filter
                  className={`h-5 w-5 ${
                    selectedCuisine !== 'all'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
                <SelectValue placeholder="Todas culinárias" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as culinárias</SelectItem>
              {availableCuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-40 lg:w-48 xl:w-56">
          <Button
            onClick={clearFilters}
            disabled={!hasFilters}
            className={`text-base rounded-md flex items-center justify-center gap-2 transition-all shadow border w-full ${
              hasFilters
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Limpar filtros"
          >
            <X
              className={`h-5 w-5 transition-transform ${
                hasFilters ? 'scale-110' : 'scale-100'
              }`}
            />
            Limpar Filtros
          </Button>
        </div>

        {isFiltering && (
          <div className="absolute top-full left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse rounded-full" />
        )}
      </div>
    </section>
  )
}
