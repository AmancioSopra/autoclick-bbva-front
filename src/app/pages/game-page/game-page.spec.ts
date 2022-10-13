import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { GameComponent } from 'src/app/components/game/game.component';
import { GamePageComponent } from './game-page.component';

describe('GamePageComponent', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;
    const DEFAULT_USER_DATA_MOCK =  {
        name: "User",
        clickCount:4,
        autoClickers: 0,
      }
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ GamePageComponent,GameComponent ],
        imports : [
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient],
            },
          }),
          RouterTestingModule
        ],
        providers: [
          TranslateService,
          HttpClient,
          HttpHandler,
        ],
      })
      .compileComponents();
  
      let store:any = {};
      const mockLocalStorage = {
          getItem: (key: string): string => {
            return key in store ? store[key] : null;
          },
          setItem: (key: string, value: string) => {
            store[key] = `${value}`;
          },
          removeItem: (key: string) => {
            delete store[key];
          },
          clear: () => {
            store = {};
          }
        };
      spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);
        localStorage.clear();
      localStorage.setItem('users', JSON.stringify([DEFAULT_USER_DATA_MOCK]));
      localStorage.setItem('currentUser', DEFAULT_USER_DATA_MOCK.name);
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(GamePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      
      expect(component).toBeTruthy();
    localStorage.setItem('lang', 'es')
   

    });

    it('should setLang in localStorage if not exist', () => {
        localStorage.clear();
        expect(localStorage.getItem('lang')).toBeFalsy();
    })

    it('should setLang in localStorage if exist', () => {
        localStorage.setItem('lang', 'es')
        expect(localStorage.getItem('lang')).toBeTruthy();
    })

   
  });