import { useQuery } from "@tanstack/react-query";
import { findRecipeById } from "@/services/find-recipe-by-id";

export const useRecipeById = (recipeId: number) => {
  return useQuery({
    queryKey: ['individual-recipe', recipeId],
    queryFn: () => findRecipeById(recipeId),
    enabled: !!recipeId,
    retry: false 
  });
};