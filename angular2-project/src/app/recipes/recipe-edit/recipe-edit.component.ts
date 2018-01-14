import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm: FormGroup;
  constructor(private route:ActivatedRoute, private respService:RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (parms:Params)=>{
        this.id=+parms['id'];
        this.editMode = parms['id'] !=null;
        this.inItForm();
      }
    );
  }

  onSubmit(){
    if(this.editMode){
      this.respService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.respService.addNewRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
  onAddIngrediant(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  onDeleteIngredent(index:number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
  private inItForm(){
   
    let recipeName='';
    let recipeURL='';
    let recipeDescription='';
    let recipeIngrediants= new FormArray([]);
    if(this.editMode){
      const recipe=this.respService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeURL=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingrediants']){
        for(let ingrediant of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediant.name,Validators.required),
               
              'amount': new FormControl(ingrediant.amount,
                [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm= new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeURL, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingrediants': recipeIngrediants
    });
  }
}
