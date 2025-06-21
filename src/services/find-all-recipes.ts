import { Recipe } from "@/types/recipes"
import { httpClient } from "./httpClient"

export const findAllRecipes = async(): Promise<Recipe[]> => {
  const res = await httpClient.get('/recipes')
  return res.data.recipes
}