'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Recipe } from '@/types/recipes'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination'
import { RecipeCard } from './recipe-card'
import { debounce } from '@/lib/debounce'

type Props = {
  recipes: Recipe[]
}

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024
}

const ITEMS_PER_PAGE = {
  sm: 4,
  md: 6,
  lg: 8,
  default: 8
}

export default function ItemCards({ recipes }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE.default)

  // Otimização: useMemo para cálculos derivados
  const totalPages = useMemo(() => Math.ceil(recipes.length / itemsPerPage), [recipes.length, itemsPerPage])

  // Otimização: useCallback para funções estáveis
  const goToPage = useCallback((page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(newPage)
  }, [totalPages])

  // Otimização: Debounce para resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newItemsPerPage = ITEMS_PER_PAGE.default

      if (width < BREAKPOINTS.sm) newItemsPerPage = ITEMS_PER_PAGE.sm
      else if (width < BREAKPOINTS.md) newItemsPerPage = ITEMS_PER_PAGE.md
      else if (width < BREAKPOINTS.lg) newItemsPerPage = ITEMS_PER_PAGE.lg

      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1) // Reset para primeira página ao redimensionar
    }

    // Debounce para melhor performance
    const debouncedResize = debounce(handleResize, 200)
    window.addEventListener('resize', debouncedResize)
    handleResize() // Chamada inicial

    return () => window.removeEventListener('resize', debouncedResize)
  }, [])

  // Receitas da página atual
  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return recipes.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, itemsPerPage, recipes])

  // Geração otimizada de números de página
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    // Lógica para páginas numeradas com ellipsis
    const pages = []
    pages.push(1)

    if (currentPage > 3) pages.push('...')

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (currentPage < totalPages - 2) pages.push('...')

    pages.push(totalPages)
    return pages
  }, [currentPage, totalPages])

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {currentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    goToPage(currentPage - 1)
                  }}
                />
              </PaginationItem>

              {pageNumbers.map((pageNum, index) => (
                <PaginationItem key={pageNum === '...' ? `ellipsis-${index}` : pageNum}>
                  {pageNum === '...' ? (
                    <span className="px-2">...</span>
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        goToPage(pageNum as number)
                      }}
                      isActive={currentPage === pageNum}
                      className={
                        currentPage === pageNum
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : ''
                      }
                    >
                      {pageNum}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    goToPage(currentPage + 1)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  )
}
