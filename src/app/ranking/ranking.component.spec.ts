import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';

import { RankingComponent } from './ranking.component';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;
  const DEFAULT_USER_DATA_MOCK =  {
    name: "User",
    clickCount:4,
    autoClickers: 0,
  }

  const DEFAULT_USER2_DATA_MOCK =  {
    name: "User2",
    clickCount:8,
    autoClickers: 0,
  }

  const DEFAULT_USER3_DATA_MOCK =  {
    name: "User3",
    clickCount:5,
    autoClickers: 0,
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingComponent ],
      imports : [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),
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
      localStorage.setItem('users', JSON.stringify([DEFAULT_USER_DATA_MOCK,DEFAULT_USER2_DATA_MOCK,DEFAULT_USER3_DATA_MOCK]));
      localStorage.setItem('currentUser', DEFAULT_USER_DATA_MOCK.name);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
   
  });
  
  it('users should be 0 if theres no localStorage', () => {
    localStorage.clear();
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.users.length).toBe(0);
  })

  it('should order correctly the rank', () => {
      
    let users = component.users;
    expect(users[0].name).toEqual(DEFAULT_USER2_DATA_MOCK.name)
    expect(users[1].name).toEqual(DEFAULT_USER3_DATA_MOCK.name)
    expect(users[2].name).toEqual(DEFAULT_USER_DATA_MOCK.name)

  })
});
