import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] =[
    new Recipe('Ckn Biryani','Curry desc',
    'http://cdn-img.health.com/sites/default/files/styles/medium_16_9/public/1502736044/shrimp-tomato-avocado-salad-extra-tomato-recipes.jpg?itok=zs1txDL4'),
    new Recipe('Avaikai Biryani','Avaikai desc',
    'http://cdn-img.health.com/sites/default/files/styles/medium_16_9/public/1502736044/shrimp-tomato-avocado-salad-extra-tomato-recipes.jpg?itok=zs1txDL4')
  
  ];
  constructor() { }

  ngOnInit() {
  }

}
