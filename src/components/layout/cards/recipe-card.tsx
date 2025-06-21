import Image from "next/image";
import FavoritedButton from "../buttons/favorited-button";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, StarIcon, UsersIcon } from "lucide-react";
import ViewRecipe from "../buttons/view-recipe";
import { Recipe } from "@/types/recipes";
import React from "react";

export const RecipeCard = React.memo(({ recipe }: { recipe: Recipe }) => (
  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow group cursor-pointer h-full flex flex-col">
    <div className="relative w-full aspect-[4/3] flex-shrink-0">
      <Image
        src={recipe.image || '/placeholder-recipe.jpg'}
        alt={recipe.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        className="transition-transform duration-300 group-hover:scale-105 object-cover"
        priority={false}
      />
      <div className="absolute top-2 right-2 z-10">
        <FavoritedButton id={recipe.id} />
      </div>
    </div>

    <div className="px-4 space-y-2 py-4 border flex-grow flex flex-col">
      <h3 className="font-bold text-lg line-clamp-1">{recipe.name}</h3>
      
      <div className="flex flex-wrap gap-2 py-2">
        {recipe.mealType.map((type) => (
          <Badge key={type} variant="secondary" className="rounded">
            {type}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-2 mt-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-bold mr-1">{recipe.rating}</span>
            <StarIcon className="fill-yellow-300 text-transparent w-4 h-4" />
          </div>
          <span className="text-muted-foreground text-sm">
            {recipe.reviewCount} {recipe.reviewCount === 1 ? 'avaliação' : 'avaliações'}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>{recipe.cookTimeMinutes + recipe.prepTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>{recipe.servings} {recipe.servings === 1 ? 'porção' : 'porções'}</span>
          </div>
        </div>
      </div>
      <ViewRecipe recipeId={recipe.id}  />
    </div>
  </div>
))