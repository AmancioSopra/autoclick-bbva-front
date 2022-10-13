import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { GameComponent } from './game.component';

describe('GameComponent 1', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const DEFAULT_USER_DATA_MOCK =  {
    name: "User",
    clickCount:4,
    autoClickers: 0,
  }

  beforeEach(async () => {
   
      
      
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),],
      declarations: [ GameComponent ],
      providers: [
        TranslateService,
        HttpClient,
        HttpHandler,
      ]
      
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
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
   
     expect(component).toBeTruthy();
  });

  it('should add 1 clic to the counter when the clicBtn is pressed, and the btn to buy autoclicks must disable o enable', () => {
    const clicCountBefore = component.clickCount;
    const btn = fixture.nativeElement.querySelector('#clicBtn');
    expect(component.canBuyDisabled).toBe(true);
    btn.click();
    const clicCountAfter = component.clickCount;
    expect(clicCountBefore).toEqual(clicCountAfter -1);
    expect(component.canBuyDisabled).toBe(false);
  })
  
});

describe('GameComponent 2', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const DEFAULT_USER_DATA_MOCK =  {
    name: "User",
    clickCount:8,
    autoClickers: 2,
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),],
      declarations: [ GameComponent ],
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
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should add 1 autoclicker to the counter when the autoClickBtn is pressed', () => {
    const autoClickerBefore = component.autoClickers;

    const btnAutoClic = fixture.nativeElement.querySelector('#autoClicBtn');
    btnAutoClic.click();

    const autoClickerAfter = component.autoClickers;
    expect(autoClickerBefore).toEqual(autoClickerAfter -1);

    btnAutoClic.click();
    btnAutoClic.click();

    expect(component.canBuyDisabled).toBe(true);
  })
  
  it('should switch ON the AutoClickers if the user has started a game before', () => {
   
    expect(component.timerSubscriptions.length).toBe(DEFAULT_USER_DATA_MOCK.autoClickers)
  }
  
)
})




