import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulariologin!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.formulariologin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.formulariologin.invalid) {
      // Reemplaza esta parte con tu lógica para mostrar mensajes sin Ionic
      console.log('Por favor, completa todos los campos correctamente');
      return;
    }
    const email = this.formulariologin.value?.email;
    const password = this.formulariologin.value?.password;
    if (email === 'admin@gmail.com' && password === '123456') {
      this.router.navigate(['/inicio-admin']);
    } else {
      try {
        // Almacenar el correo electrónico en el Local Storage
        localStorage.setItem('email', email);
        console.log('Correo electrónico guardado en el Local Storage');
        this.router.navigate(['/barra-navegacio']);
      } catch (error) {
        // Reemplaza esta parte con tu lógica para manejar errores
        console.log(
          'Error en el inicio de sesión. Por favor, intenta nuevamente'
        );
      }
    }
  }
}
