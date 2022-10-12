import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const USER_DATA_MOCK =  {
    name: "Amancio",
    clickCount:5,
    autoClickers: 0,
  }
  const USER_STORE_MOCK = {
    users: [USER_DATA_MOCK],
    currentUser: USER_DATA_MOCK.name
  } 
  
  beforeEach(async () => {
   
      
      
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ GameComponent ]
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
      localStorage.setItem('users', JSON.stringify([USER_DATA_MOCK]));
      localStorage.setItem('currentUser', USER_DATA_MOCK.name);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});
