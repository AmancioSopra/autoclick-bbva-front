import { IfStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})

export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  public imgAvatarPath: string = '../assets/images/logo.jpg';

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  
  userNameValidator(isValid: boolean): boolean {
    if (isValid === false) {
      return (
        this.loginForm.get('username')?.touched == true &&
        this.loginForm.get('username')?.invalid == true
      );
    } else return !this.loginForm.get('username')?.invalid;
  }

  
  onSubmit() {
    if (this.loginForm.status == 'INVALID') {
      alert('El formulario está mal cumplimentado');
    } else {
      
      alert('OK');
      this.setLocalStorage();
    }
  }
  private initForm() {
    const regExpEmail = `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$`;

    return this.formBuilder.group({
      username: [
        '',,
        [Validators.required, Validators.minLength(5)]
      ],
     
    });
  }

  private setLocalStorage() {
    const user:any = {
      name:  this.loginForm.value['username'],
      clickCount: 0
    }

    // const users: any= localStorage.getItem('users');
    let usersStorage:any[] = JSON.parse(localStorage.getItem('users') || "[]" );
    
    let users: any[] = [];
    
    if(usersStorage.length == 0){
      usersStorage.push(user);
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', user.name);
    }
    else{
        let userFounded = usersStorage.find(x=> x.name == user.name)

        if(userFounded != null){
          localStorage.setItem('currentUser', user.name)
        }
        else{
          usersStorage.push(user);
          localStorage.setItem('users', JSON.stringify(usersStorage))
          localStorage.setItem('currentUser', user.name)
        }
    }  
  }
}
