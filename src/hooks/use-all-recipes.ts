import { findAllRecipes } from "@/services/find-all-recipes"
import { useQuery } from "@tanstack/react-query"

export const useAllRecipes = () => {
  return useQuery({
    queryKey: ['all-recipes'],
    queryFn: findAllRecipes
  })
}