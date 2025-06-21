'use client'

import BackButton from '@/components/layout/buttons/back-button';
import { useRecipeById } from '@/hooks/use-recipe-by-id';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import FavoritedButton from '../layout/buttons/favorited-button';
import { Badge } from '../ui/badge';
import { StarIcon } from 'lucide-react';
import IngredientCards from '../layout/cards/ingredient-cards';
import InfoRecipeCard from '../layout/cards/info-recipe-card';
import RecipesLoading from '../layout/loading/recipes-loading';
import Header from '../layout/Header';

export default function RecipeScreen() {
  const params = useParams();
  const recipeId = Number(params?.id);

  const {
    data: individualRecipe,
    error,
    isLoading
  } = useRecipeById(recipeId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
      <RecipesLoading/>
    </div>)
  }
  if (error) return <div>Erro: {error.message}</div>;
  if (!individualRecipe) return <div>Receita não encontrada</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className='space-y-4'>
            <div className='relative mb-6'>
              <Image
                src={individualRecipe.image || "/placeholder.svg"}
                alt={individualRecipe.name}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              <FavoritedButton id={individualRecipe.id} />
            </div>
            <div className="space-y-2">
              <div className='flex flex-wrap gap-2 mb-3'>
                <Badge variant={'secondary'} className='text-sm mb-1 rounded'>{individualRecipe.mealType}</Badge>
                <Badge variant={'secondary'} className='text-sm mb-1 rounded'>{individualRecipe.cuisine}</Badge>
                <Badge
                  className='text-sm mb-1 rounded'
                  variant={
                    individualRecipe.difficulty === 'Easy' ?
                      'default' :
                      individualRecipe.difficulty === 'Medium' ?
                        'secondary' : 'destructive'
                  }
                >{individualRecipe.difficulty}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3" >{individualRecipe.name}</h1>

              <div className="flex items-center gap-2 px-2 ">
                <div className="flex items-center">
                  <span className="font-bold mr-1">{individualRecipe.rating}</span>
                  <StarIcon className="fill-yellow-300 text-transparent w-4 h-4" />
                </div>
                <span className="text-muted-foreground text-sm">
                  {individualRecipe.reviewCount} {individualRecipe.reviewCount === 1 ? 'avaliação' : 'avaliações'}
                </span>
              </div>

              <IngredientCards recipe={individualRecipe} />

            </div>
          </div>
          <InfoRecipeCard recipe={individualRecipe} />
        </div>

      </div>
    </div>
  );
} 