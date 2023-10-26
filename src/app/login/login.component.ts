import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router module
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private router: Router // Inject the Router module
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.servicioService.login(this.loginForm.value).subscribe(
        (response) => {
          // Handle a successful login, e.g., save token in local storage and redirect
          console.log('Login successful');
          console.log(response);

          // Redirect to another page after successful login
          this.router.navigate(['/barra-navegacion']); // Replace 'dashboard' with the route to your desired page
        },
        (error) => {
          // Handle login error
          console.error('Login failed');
        }
      );
    }
  }
}
