import { Component, OnInit , ViewChild, EventEmitter,ElementRef, Output} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') inputNameRef : ElementRef;
  @ViewChild('inputAmount') inputAmountRef: ElementRef;

  @Output() ingradentAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }
  onAddIngredient(){
    const name =  this.inputNameRef.nativeElement.value;
    const amount=  this.inputAmountRef.nativeElement.value;
    const newIngredient= new Ingredient(name,amount);
    this.ingradentAdded.emit(newIngredient);
  }
}
