import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tipsy';

  form = this.fb.group({
    name: ['', {
      Validators: [

      ]
    }],
    email: ['', {
        validators: [
            Validators.required, 
            Validators.email
        ],
        updateOn: 'blur'
    }],
    password: ['', 
        [
          Validators.required, 
          Validators.minLength(8),
          // createPasswordStrengthValidator()
        ]
    ]
  });  

  constructor(private fb: FormBuilder) {}

  get name() {
      return this.form.controls['name'];
  }

  get email() {
      return this.form.controls['email'];
  }

  get password() {
      return this.form.controls['password'];
  }
}
