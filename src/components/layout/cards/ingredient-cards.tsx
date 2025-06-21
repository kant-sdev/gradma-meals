import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Recipe } from '@/types/recipes'
import { ChefHatIcon } from 'lucide-react'
import React from 'react'

type IngredientCardProps = {
  recipe: Recipe
}

export default function IngredientCards({ recipe }: IngredientCardProps) {
  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHatIcon className="h-5 w-5" />
            Ingredientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modo de Preparo</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <p className="pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </>
  )
}
