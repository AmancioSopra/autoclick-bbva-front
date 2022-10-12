import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginUserComponent } from './login-user.component';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;
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
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ LoginUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
      
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return INVALID FORM if the email is not valid', () => {
      const form = component.loginForm;
      const inputName = form.controls['username'];
      inputName.setValue("");
      expect(form.invalid).toBe(true);
      inputName.setValue("hola");
      expect(form.invalid).toBe(true);
  })
  
  it('should show alert message when form submited is invalid', () => {
      const button = fixture.nativeElement.querySelector('#submitBtn');
      spyOn(window, 'alert');
      button.click();

      expect(window.alert).toHaveBeenCalledWith('El formulario está mal cumplimentado');
  })

  it('should save data in localStorage when form is OK', () => {
    const form = component.loginForm;
      const inputName = form.controls['username'];
      const button = fixture.nativeElement.querySelector('#submitBtn');
      inputName.setValue("NuevoUsuario");
      button.click();

      expect(localStorage.getItem("currentUser")).toEqual("NuevoUsuario");
  })
  
  it('should search the user in the localStorage when the user EXISTS', () => {
    const form = component.loginForm;
    const inputName = form.controls['username'];
    const button = fixture.nativeElement.querySelector('#submitBtn');

    localStorage.setItem('users', JSON.stringify([USER_DATA_MOCK]));
    localStorage.setItem('currentUser', USER_DATA_MOCK.name);

    inputName.setValue("Amancio");
    button.click();
    
    expect(localStorage.getItem('users')?.length).not.toBe(0);
    expect(localStorage.getItem('currentUser')).toEqual("Amancio");
  })

  it('should search the user in the localStorage when the user DOESNT EXISTS', () => {
    const form = component.loginForm;
    const inputName = form.controls['username'];
    const button = fixture.nativeElement.querySelector('#submitBtn');

    localStorage.setItem('users', JSON.stringify([USER_DATA_MOCK]));
    localStorage.setItem('currentUser', USER_DATA_MOCK.name);

    inputName.setValue("NuevoUsuario");
    button.click();
    
    expect(localStorage.getItem('users')?.length).not.toBe(0);
    expect(localStorage.getItem('currentUser')).toEqual("NuevoUsuario");
  })
})