import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  username:any;
  clickCounter:number = 0;
  constructor() { 
    this.username = ''
  }

  ngOnInit(): void {
   this.username =  localStorage.getItem('username') ? localStorage.getItem('username') : 'No hay nombre' ;
   this.clickCounter = 0 ;

   
  }

}
