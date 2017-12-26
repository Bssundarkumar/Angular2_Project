import { EventEmitter, Injectable } from '@angular/core';
import { Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipesList: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('ckn',2),
      new Ingredient('hen',4)]),
        new Recipe('Another Test Recipe', 'This is simply a test', 
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meat',1),
        new Ingredient('checken',2)
      ])
      ];
      constructor(private slService:ShoppingListService){}
      getRecipes(){
        return this.recipesList.slice();
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredientsFromRecipe(ingredients);
      }
}