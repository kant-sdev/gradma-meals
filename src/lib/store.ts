import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Recipe } from "@/types/recipes"
import { httpClient } from "@/services/httpClient"
import { findAllRecipes } from "@/services/find-all-recipes"

type RecipeStore = {
  recipes: Recipe[]
  favoriteIds: number[]
  setRecipes: (recipes: Recipe[]) => void
  addRecipe: (recipe: Recipe) => void
  updateRecipe: (recipe: Recipe) => void
  removeRecipe: (id: number) => void
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  loadInitialRecipes: () => Promise<void> 
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      recipes: [],
      favoriteIds: [],
      setRecipes: (recipes) => set({ recipes }),
      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [...state.recipes, recipe],
        })),
      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          ),
        })),
      removeRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
          favoriteIds: get().favoriteIds.filter((favId) => favId !== id),
        })),
      toggleFavorite: (id) => {
        const { favoriteIds } = get()
        const isFav = favoriteIds.includes(id)
        set({
          favoriteIds: isFav
            ? favoriteIds.filter((favId) => favId !== id)
            : [...favoriteIds, id],
        })
      },
      isFavorite: (id) => get().favoriteIds.includes(id),
      loadInitialRecipes: async () => {
        const initialRecipes = await findAllRecipes()
        set({ recipes: initialRecipes })
      }
    }),
    {
      name: "recipe-storage",
    }
  )
)