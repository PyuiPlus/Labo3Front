import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup = new FormGroup({})


  constructor(private  fb: FormBuilder, private authservice : AuthService) {
    
    this.formLogin = this.fb.group(
      {
        email : ["", Validators.required],
        password: ["", Validators.required]
      }
    )
  }
  submitLogin(){
    if (this.formLogin.valid) {
      this.authservice.login(this.formLogin.value.email, this.formLogin.value.password)
    }
  }
  
}

