import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  username:any;
  clickCounter:number = 0;
  autoClics = 0;
  autoClickerBaseCost = 2;
  messageAutoClicker = "";
  canBuy:boolean = false;
  autoClickerCost = 0;


  constructor() { 
    this.username = ''
  }

  calculateAutoClickerCost() {
  return this.autoClickerBaseCost + this.autoClickerBaseCost * this.autoClics;
  }
  getAutoClickCost(){
    this.autoClickerCost =  this.calculateAutoClickerCost();

    if(this.autoClickerCost > this.clickCounter){
      this.messageAutoClicker = `Necesitas ${this.autoClickerCost - this.clickCounter} clics`;
      this.canBuy = false;
    }
    else{
      this.canBuy = true;
      this.messageAutoClicker = `Puedes comprar SUPER clics`;
    }

  }


  ngOnInit(): void {
   this.username =  localStorage.getItem('currentUser');

   let users: any[] = JSON.parse(localStorage.getItem('users') || "[]" );
   let currentUser = users.find(x=> this.username == x.name);
   this.clickCounter = currentUser.clickCount;
   this.autoClics = currentUser.autoClickers;
   
   this.getAutoClickCost()


    

   
  }
  
  sumaClic(){
    this.clickCounter++;
  }

  compraAutoClic(){
   this.autoClics++;
   this.getAutoClickCost();

  }
  


}
