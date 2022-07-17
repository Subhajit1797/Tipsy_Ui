import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup | any;
  fieldRequired: string = "This field is required"
  constructor(public router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.pattern(emailregex)]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
    )


  }
  emaiErrors() {
    return this.registerForm.get('email').hasError('required') ? 'Email is required' :
      this.registerForm.get('email').hasError('pattern') ? 'Email is not valid' : ''
  }
  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password').hasError('required') ? 'Password is required' :
      this.registerForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string) {
    const validation = this.registerForm.get(input).invalid && (this.registerForm.get(input).dirty || this.registerForm.get(input).touched)
    return validation;
  }

 submit(formData: FormGroup, formDirective: FormGroupDirective): void {

    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;
   

    const registrationData = {
      name: username,
      email: email,
      password: password,

    }

    if(this.registerForm.valid) {
      this.router.navigate(['login']);
      sessionStorage.setItem('registrationFormData', JSON.stringify(registrationData));
    }

  }

}