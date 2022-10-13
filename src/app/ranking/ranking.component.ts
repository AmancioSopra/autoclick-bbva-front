import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  users:any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  private getUsers(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log("Usuarios no ordenados", users);
   
    this.users = users.sort((a:any,b:any) => (a.clickCount < b.clickCount) ? 1 : -1)
  }
}
