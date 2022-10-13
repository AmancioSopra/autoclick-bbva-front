import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  rankingShowed = false;
  btnLabel = "Ver ranking"
  constructor() { }

  ngOnInit(): void {
  }
  
   showRanking(){
    this.rankingShowed = !this.rankingShowed
    this.btnLabel = !this.rankingShowed ? "Ver ranking" : "Atrás";
  }
}
