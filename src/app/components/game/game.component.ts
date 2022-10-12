import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  username:any = '';
  clickCount:number = 0;
  autoClickers = 0;
  autoClickerBaseCost = 2;
  messageAutoClicker = "";
  canBuyDisabled:boolean = true;
  autoClickerCost = 0;
  timer$:Observable<any>;
  timerSubscriptions:Subscription[] = [];

  constructor(private router:Router) { 
      this.timer$ = interval(1000)
      .pipe(takeWhile(()=> true));
  }

  calculateAutoClickerCost() {
  return this.autoClickerBaseCost + this.autoClickerBaseCost * this.autoClickers;
  }
  getAutoClickCost(){
    this.autoClickerCost =  this.calculateAutoClickerCost();

    if(this.autoClickerCost > this.clickCount){
      this.messageAutoClicker = `Necesitas ${this.autoClickerCost - this.clickCount} clics para comprar SUPER clics`;
      this.canBuyDisabled = true;
    }
    else{
      this.canBuyDisabled = false;
      this.messageAutoClicker = `Puedes comprar ${Math.floor(this.clickCount / this.autoClickerCost)} SUPER clics`;
    }

  }


  ngOnInit(): void {
  console.log("ONINIT");
   this.username =  localStorage.getItem('currentUser');

   let users: any[] = JSON.parse(localStorage.getItem('users') || "[]" );
   let currentUser = users.find(x=> this.username == x.name);

   this.clickCount = currentUser.clickCount;
   this.autoClickers = currentUser.autoClickers;
   
   this.getAutoClickCost();
   if(currentUser.autoClickers != 0){
    console.log("ENTRA")
    for(let i = 0; i < currentUser.autoClickers; i++){
      this.timerSubscriptions.push((this.timer$.subscribe(()=> {
        this.clickCount++;
           this.getAutoClickCost();
           this.setLocalStorage();
       })  ))
    }
      
   }
}
  
  sumaClic(){
    
    this.clickCount++;
    this.setLocalStorage();
    this.getAutoClickCost();
    this.canBuyDisabled = this.clickCount < this.autoClickerCost
     ? true
     : false
   
  }
  
  startAutoClic(){
    
    this.timerSubscriptions.push(this.timer$.subscribe(()=> {
      this.clickCount++;
         this.getAutoClickCost();
         this.setLocalStorage();
     })  )
  }
  
  compraAutoClic(){
   this.autoClickers++;
   this.clickCount =  this.clickCount - this.autoClickerCost;
   this.getAutoClickCost();
   this.setLocalStorage();
   this.startAutoClic();
  }
  
  setLocalStorage(){
    let users: any[] = JSON.parse(localStorage.getItem('users') || "[]" );
    let userFounded = users.findIndex(x=> this.username == x.name);
    if(userFounded != -1){
      users[userFounded].clickCount = this.clickCount;
      users[userFounded].autoClickers = this.autoClickers;
    }
    
    localStorage.setItem('users', JSON.stringify(users));
}

  navigateBack(){
    this.router.navigate(['/home']);
  }
  ngOnDestroy(){
    console.log("OnDESTROY")
    this.timerSubscriptions.forEach(sub => {
      sub.unsubscribe();
    })
    
  }


}
