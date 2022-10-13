import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      this.translate.setDefaultLang('es');
      this.translate.addLangs(['en', 'es']);
      this.translate.use('es');
      localStorage.setItem('lang', 'es');
    } else {
      this.translate.use(lang);
    }
  }
}
