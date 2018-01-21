import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/add/operator/map';
import { Response } from "@angular/http";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataStorageService{
    constructor(private http:Http, private recipeService: RecipeService,
    private authService:AuthService){ }

    storeRecipe(){
        const token=this.authService.getToken();
     return   this.http.put('https://ng-recipe-shopping-book.firebaseio.com/recipes.json?auth='+ token,
     this.recipeService.getRecipes());
    }

    getStroedRecipes(){
      const token=this.authService.getToken();
           return   this.http.get('https://ng-recipe-shopping-book.firebaseio.com/recipes.json?auth=' + token)
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