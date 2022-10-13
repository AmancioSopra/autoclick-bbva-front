import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  users:any[] = [];
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  private getUsers(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.length != 0)
      this.users = users.sort((a:any,b:any) => (a.clickCount < b.clickCount) ? 1 : -1)
    
    
  }
}
