import { Recipe } from "@/types/recipes";
import { httpClient } from "./httpClient";

export const findRecipeById = async (recipeId: number): Promise<Recipe> => {
  const res = await httpClient.get(`/recipes/${recipeId}`);
  if (!res.data) { 
    throw new Error(`Receita com ID ${recipeId} não encontrada.`);
  }
  return res.data;
};