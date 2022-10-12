import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  AUTOCLICKER_BASE_COST = 2;
  CLICS_BEFORE_SHOW_AUTOCLICKER_BUTTON = 4;

  username:any = '';
  clickCount:number = 0;
  autoClickers = 0;
  autoClickerBaseCost = this.AUTOCLICKER_BASE_COST;
  messageAutoClicker = "";
  canBuyDisabled:boolean = true;
  autoClickerCost = 0;
  timer$:Observable<any>;
  timerSubscriptions:Subscription[] = [];

  constructor(private router:Router) { 
      this.timer$ = interval(1000)
      .pipe(takeWhile(()=> true));
  }
  ngOnInit(): void {

   
    this.getData();
    this.getAutoClickCost();
    

    if(this.autoClickers != 0){
      for(let i = 0; i < this.autoClickers; i++){
        this.timerSubscriptions.push((this.timer$.subscribe(()=> {
          this.addClic()
         })  ))
      }
        
     }
  }
 
  addClic(){
    this.clickCount++;
    this.setLocalStorage();
    this.getAutoClickCost();
    this.canBuyDisabled = this.clickCount < this.autoClickerCost
     ? true
     : false
  }

  

  buyAutoClic(){
   this.autoClickers++;
   this.clickCount =  this.clickCount - this.autoClickerCost;
   this.getAutoClickCost();
   this.setLocalStorage();
   this.startAutoClic();
  }

  navigateBack(){
    this.router.navigate(['/home']);
  }
  private getData(){
    this.username =  localStorage.getItem('currentUser') || 'defaultUser';
    let users: any[] = JSON.parse(localStorage.getItem('users') || "[]" );
    
    let currentUser = users.find(x => x.name == this.username);
    this.clickCount = currentUser.clickCount;
    this.autoClickers = currentUser.autoClickers;
  }
  private calculateAutoClickerCost() {
  return this.autoClickerBaseCost + this.autoClickerBaseCost * this.autoClickers;
  }
  private getAutoClickCost(){
    this.autoClickerCost =  this.calculateAutoClickerCost();

    if(this.clickCount <= this.CLICS_BEFORE_SHOW_AUTOCLICKER_BUTTON){
      this.canBuyDisabled = true;
      return;
    }

    if(this.autoClickerCost > this.clickCount){
      this.messageAutoClicker = `Necesitas ${this.autoClickerCost - this.clickCount} clics para comprar SUPER clics`;
      this.canBuyDisabled = true;
      
    }
    else{
      this.canBuyDisabled = false;
      this.messageAutoClicker = `Puedes comprar ${Math.floor(this.clickCount / this.autoClickerCost)} SUPER clics`;
    }
    
  }

  private startAutoClic(){
    
    this.timerSubscriptions.push(this.timer$.subscribe(()=> {
      this.addClic();
     })  )
  }
  
  
  private setLocalStorage(){
    let users: any[] = JSON.parse(localStorage.getItem('users') || "[]" );
    let userFounded = users.findIndex(x=> this.username == x.name);
    if(userFounded != -1){
      users[userFounded].clickCount = this.clickCount;
      users[userFounded].autoClickers = this.autoClickers;
    }
    
    localStorage.setItem('users', JSON.stringify(users));
}

  
  ngOnDestroy(){
    this.timerSubscriptions.forEach(sub => {
      sub.unsubscribe();
    })
    
  }


}
