
import {Ingredient} from '../shared/ingredient.model'; 
import { Subject } from 'rxjs/Subject';


export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing= new Subject<number>();

  private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]

      getIngredients(){
          return this.ingredients.slice();
      }
      getIngrediant(index:number){
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredientsFromRecipe(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //   this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index:number,newIngrediant:Ingredient){
        this.ingredients[index]=newIngrediant;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());      }
}