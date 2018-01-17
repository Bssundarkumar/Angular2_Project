import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/add/operator/map';
import { Response } from "@angular/http";
import { Recipe } from "../recipes/recipe.model";
@Injectable()
export class DataStorageService{
    constructor(private http:Http, private recipeService: RecipeService){ }

    storeRecipe(){
     return   this.http.put('https://ng-recipe-shopping-book.firebaseio.com/recipes.json',
     this.recipeService.getRecipes());
    }

    getStroedRecipes(){
     return   this.http.get('https://ng-recipe-shopping-book.firebaseio.com/recipes.json')
     .map(
         (response:Response)=>{
            const recipies:Recipe[]=response.json();
            for(let recipe of recipies){
                if(!recipe['ingrediants']){
                    console.log(recipe);
                    recipe['ingrediants']=[];
                }
            }
            return recipies;
         }
     )
     .subscribe(
    (recipies:Recipe[])=>{
        this.recipeService.setRecipies(recipies);
    }
    );
    }

}