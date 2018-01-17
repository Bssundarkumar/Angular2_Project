import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService:DataStorageService){

  }
  onSaveData(){
    this.dataStorageService.storeRecipe().subscribe(
      (response:Response)=>{}
    );
  }
  onFetchData(){
    this.dataStorageService.getStroedRecipes();
  }
}
