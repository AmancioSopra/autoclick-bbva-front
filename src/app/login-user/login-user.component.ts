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
      email: new FormControl(''),
      password: new FormControl(''),
      reminder: new FormControl(false),
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
    }
  }
  private initForm() {
    const regExpEmail = `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$`;

    return this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(5)]
      ],
     
    });
  }

  // private setLocalStorage() {
  //   localStorage.setItem('user', this.loginForm.value['email']);
  //   localStorage.setItem('password', this.loginForm.value['password']);
  // }
}
