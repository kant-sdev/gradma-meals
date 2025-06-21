import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Recipe } from '@/types/recipes'
import { ClockIcon, FlameIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type InfoRecipeCardProps = {
  recipe: Recipe
}

export default function InfoRecipeCard({ recipe }: InfoRecipeCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Informações da Receita</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tempo de Preparo</span>
            </div>
            <span className="font-medium">{recipe.prepTimeMinutes} min</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlameIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tempo de Cocção</span>
            </div>
            <span className="font-medium">{recipe.cookTimeMinutes} min</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tempo Total</span>
            </div>
            <span className="font-medium">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Porções</span>
            </div>
            <span className="font-medium">{recipe.servings}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm">Calorias por porção</span>
            <span className="font-medium">{recipe.caloriesPerServing} kcal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
