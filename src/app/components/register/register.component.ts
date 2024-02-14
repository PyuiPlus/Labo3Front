import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { birthdateValidator } from 'src/app/shared/validators/birthDate.validator';
import { telValidator } from 'src/app/shared/validators/tel.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup = new FormGroup({})


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.formRegister =  this.fb.group(
      {
        email : ["", [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required, Validators.minLength(8)], 
        firstname : ['', Validators.required],
        lastname : ['', Validators.required],
        phone : ['', [Validators.required, telValidator()] ],
        birthDate : ['', [Validators.required, birthdateValidator()]]
      }
    )
  }

  submitForm() {
    
    if (this.formRegister.valid && this.formRegister.value.password == this.formRegister.value.confirm_password) {
      this.auth.register(this.formRegister.value.email, this.formRegister.value.password, this.formRegister.value.firstname, this.formRegister.value.lastname, this.formRegister.value.phone, this.formRegister.value.birthDate)
    }
  }
}
