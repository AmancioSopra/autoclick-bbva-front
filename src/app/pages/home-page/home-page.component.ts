import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  rankingShowed = false;
  btnLabel = 'pages.home.seeRanking';
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

  showRanking() {
    this.rankingShowed = !this.rankingShowed;
    this.btnLabel = !this.rankingShowed
      ? 'pages.home.seeRanking'
      : 'pages.home.back';
  }

  changeLanguage() {
    switch (this.translate.currentLang) {
      case 'en':
        this.translate.use('es');
        localStorage.setItem('lang', 'es');
        break;
      case 'es':
        this.translate.use('en');
        localStorage.setItem('lang', 'en');
        break;
    }
  }
}
